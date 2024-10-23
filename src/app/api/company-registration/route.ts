import crypto from 'crypto'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { env } from '@/env'

const prisma = new PrismaClient()

// Criando o esquema de validação
const companySchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  state: z.string().min(2, { message: 'O estado é obrigatório.' }),
  clients: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'O número de clientes deve ser positivo'),
  minKwh: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'O mínimo de kWh deve ser maior que 0'),
  costKwh: z
    .string()
    .refine(
      (val) => {
        const numericValue = parseFloat(val.replace(',', '.'))
        return numericValue >= 0.01
      },
      { message: 'O custo por kWh deve ser no mínimo R$ 0,01' },
    )
    .transform((val) => parseFloat(val.replace(',', '.'))),
  logoImg: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'A imagem deve ter no máximo 5MB.' })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'A imagem deve ser do tipo PNG ou JPEG.',
    }),
})
export async function POST(request: NextRequest) {
  const formData = await request.formData()

  // Preparar os dados para validação
  const companyDataForm = {
    name: formData.get('name') as string,
    state: (formData.get('state') as string)?.toUpperCase(),
    clients: formData.get('clients') as string,
    minKwh: formData.get('minKwh') as string,
    costKwh: formData.get('costKwh') as string,
    logoImg: formData.get('logoImg') as File, // O logoImg deve ser um arquivo
  }

  const s3 = new S3Client({
    region: env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })

  try {
    // Validar os dados usando o esquema zod
    const companyData = companySchema.parse(companyDataForm)

    // Gerando string aleatória para atribuir novo nome
    const randomPart = crypto.randomBytes(16).toString('hex')

    // Criando um novo File com o novo nome, mantendo o conteúdo e o tipo do arquivo original
    const newFile = new File([companyData.logoImg], `${randomPart}-${companyData.logoImg.name}`, {
      type: companyData.logoImg.type,
    })

    // Substitua o arquivo original pelo novo arquivo
    companyData.logoImg = newFile

    // Prepara o corpo do arquivo para incluir no obj de envio ao S3
    const buffer = await newFile.arrayBuffer()

    // Construção de objeto para envio ao S3
    const uploadCommand = new PutObjectCommand({
      Bucket: 'api-img-dev-elias',
      Key: newFile.name,
      ContentType: newFile.type,
      Body: Buffer.from(buffer),
    })

    // Subir arquivo para o S3 na AWS
    try {
      await s3.send(uploadCommand)
    } catch (uploadError) {
      console.error('Error uploading image to S3: ', uploadError)
      return NextResponse.json('Erro ao fazer upload da imagem', { status: 500 })
    }

    // Criar registro da empresa no banco
    try {
      await prisma.company.create({
        data: {
          ...companyData,
          logoImg: newFile.name,
          clients: Number(companyData.clients),
          minKwh: Number(companyData.minKwh),
        },
      })
    } catch (err) {
      console.error('Erro no banco de dados: ', err)
      return new NextResponse('Erro interno', { status: 500 })
    }

    return new NextResponse(null, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { status: 400 })
    }

    return new NextResponse('Erro interno', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
