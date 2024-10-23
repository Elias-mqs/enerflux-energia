import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const prisma = new PrismaClient()

// Esquema de validação para o FormData
const formDataSchema = z.object({
  userEmail: z.string().email('E-mail inválido.'),
  companyId: z.string().uuid('ID da empresa inválido.'),
  rating: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((val) => val >= 1 && val <= 5, 'A avaliação deve ser um valor entre 1 e 5.'),
})

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  // Atribuindo dados do fumulário
  const assessmentDataForm = {
    userEmail: formData.get('userEmail') as string,
    companyId: formData.get('companyId') as string,
    rating: formData.get('rating') as string,
  }

  try {
    // Validando dados do formulario
    const assessmentData = formDataSchema.parse(assessmentDataForm)

    // Verificando se o usuário já havia realizado uma avaliação da mesma empresa
    const verifyRating = await prisma.companyReview.findFirst({
      where: {
        companyId: assessmentData.companyId,
        userEmail: assessmentData.userEmail,
      },
      select: {
        id: true,
        rating: true,
        createdAt: true,
      },
    })

    if (verifyRating) {
      return Response.json({ error: 'Usuário já realizou uma avaliação' }, { status: 401 })
    }

    // Cria novo registro da avaliação
    await prisma.companyReview.create({
      data: {
        rating: assessmentData.rating,
        companyId: assessmentData.companyId,
        userEmail: assessmentData.userEmail,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { status: 400 })
    }

    return new NextResponse('Erro interno', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
