import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import { z } from 'zod'

const prisma = new PrismaClient()

// Define o schema Zod para validar o valor de minKwh
const minKwhSchema = z.number().int()

export async function GET(request: NextRequest) {
  // Pegando o valor de 'min-kwh' da query string
  const params = request.nextUrl.searchParams.get('min-kwh')

  // Se não houver o parâmetro 'min-kwh', retorna uma resposta de erro
  if (!params) {
    return NextResponse.json({ message: 'Informe um valor de kWh' }, { status: 400 })
  }

  // Tenta converter o valor para número inteiro
  const minKwhValue = parseInt(params, 10)

  // Valida se o valor é um número inteiro
  const result = minKwhSchema.safeParse(minKwhValue)

  if (!result.success) {
    return NextResponse.json({ message: 'Informe um valor válido' }, { status: 400 })
  }

  try {
    // Faz a consulta no banco de dados
    const fetchCompanies = await prisma.company.findMany({
      where: {
        minKwh: {
          lte: minKwhValue,
        },
      },
      select: {
        id: true,
        name: true,
        minKwh: true,
        clients: true,
        costKwh: true,
        logoImg: true,
        state: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // Calcula a média das avaliações para cada empresa
    const companyData = fetchCompanies.map((company) => {
      const totalReviews = company.reviews.length
      const totalRating = company.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0

      const imageS3 = `https://api-img-dev-elias.s3.amazonaws.com/${company.logoImg}`

      return {
        id: company.id,
        name: company.name,
        minKwh: company.minKwh,
        clients: company.clients,
        costKwh: company.costKwh,
        logoImg: imageS3,
        state: company.state,
        averageRating,
        totalReviews,
      }
    })

    // Retorna as empresas encontradas
    return NextResponse.json(companyData, { status: 200 })
  } catch (err) {
    console.error('Erro ao buscar fornecedores', err)
    return new NextResponse('Erro interno', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
