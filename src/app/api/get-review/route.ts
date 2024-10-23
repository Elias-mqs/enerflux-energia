import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  // Atribuindo os parametros de busca às variáveis
  const companyId = request.nextUrl.searchParams.get('companyId')
  const userEmail = request.nextUrl.searchParams.get('userEmail')

  if (!companyId || !userEmail) {
    return new NextResponse(null, { status: 400 })
  }

  try {
    // Verificando se há alguma avaliação registrada para esse usuário
    const verifyRating = await prisma.companyReview.findFirst({
      where: {
        companyId,
        userEmail,
      },
      select: {
        rating: true,
      },
    })

    if (!verifyRating) {
      return NextResponse.json({ userRating: null }, { status: 200 })
    }

    return NextResponse.json({ userRating: verifyRating.rating }, { status: 200 })
  } catch (error) {
    console.error('Get review error', error)
    return new NextResponse('Erro interno', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
