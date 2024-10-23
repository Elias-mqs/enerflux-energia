import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

// Esquema de validação para o FormData
const formDataSchema = z.object({
  userEmail: z.string().email('E-mail inválido.'),
  companyId: z.string().uuid('ID da empresa inválido.'),
  rating: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((val) => val >= 1 && val <= 5, 'A avaliação deve ser um valor entre 1 e 5.'),
})

export async function PATCH(request: NextRequest) {
  const formData = await request.formData()

  // Atribuindo dados do fumulário
  const assessmentDataForm = {
    userEmail: formData.get('userEmail') as string,
    companyId: formData.get('companyId') as string,
    rating: formData.get('rating') as string,
  }

  try {
    // Validando dados do formulario
    const assessmentUpdateData = formDataSchema.parse(assessmentDataForm)

    // Busca o id da avaliação antiga
    const oldReview = await prisma.companyReview.findFirst({
      where: {
        companyId: assessmentUpdateData.companyId,
        userEmail: assessmentUpdateData.userEmail,
      },
      select: {
        id: true,
      },
    })

    if (!oldReview) {
      return NextResponse.json({ message: 'Você ainda não realizou uma avaliação' }, { status: 400 })
    }

    // Atualiza a avaliação
    await prisma.companyReview.update({
      where: {
        id: oldReview.id,
      },
      data: {
        rating: assessmentUpdateData.rating,
      },
    })

    return NextResponse.json({ message: 'Avaliação atualizada com sucesso' }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { status: 400 })
    }

    return new NextResponse('Erro interno', { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
