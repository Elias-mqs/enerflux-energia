import { Dispatch, SetStateAction, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'
import { MdClose, MdOutlineStarBorder, MdStar } from 'react-icons/md'
import { toast } from 'react-toastify'

import { useRatingMutations } from '../rating-mutations'

interface RatingModalProps {
  userSession: Session
  companyId: string
  setRatingModal: Dispatch<SetStateAction<boolean>>
}

export function RatingModal({ userSession, companyId, setRatingModal }: RatingModalProps) {
  const router = useRouter()

  // Chama as funções de criação e atualização
  const { submitReview, evaluationUpdate } = useRatingMutations()

  const [rating, setRating] = useState<number>(0) // Estado para armazenar a quantidade de estrelas selecionadas

  // Verifica se o usuário já realizou uma avaliação, se sim, busca a nota
  const { data: reviews } = useQuery({
    queryKey: ['check-has-evalueted', 'get-review', companyId],
    queryFn: async () => {
      const response = await axios.get(`get-review?companyId=${companyId}&userEmail=${userSession.user?.email}`)

      const responseData: { userRating: number } | null = response.data

      if (!!responseData && !!responseData.userRating) {
        setRating(responseData.userRating)
      }

      return responseData
    },
  })

  // Função para envio da avaliação e atualização de queries de busca
  const createRating = async () => {
    const userToken = await getCsrfToken()

    const formData = new FormData()

    // Verificar se o usuário está logado para enviar a avaliação
    if (!userSession.user?.email || !userToken) {
      return router.push('/')
    }

    // Preparando formulario
    formData.append('userEmail', userSession.user.email)
    formData.append('companyId', companyId)
    formData.append('rating', rating.toString())

    try {
      // Envia os dados para api para a API
      await submitReview({ formData, userToken })
      // Fechar modal após envio da avaliação
      setRatingModal(false)

      // Retorno visual para o usuário
      toast.success('Avaliação realizada!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a nota. Tente novamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  // Função para envio da atualização da avaliação e atualização das queries de busca
  const ratingUpdate = async () => {
    const userToken = await getCsrfToken()

    const formData = new FormData()

    // Verificar se o usuário está logado para enviar a avaliação
    if (!userSession.user?.email || !userToken) {
      return router.push('/')
    }

    // Preparando formulario
    formData.append('userEmail', userSession.user.email)
    formData.append('companyId', companyId)
    formData.append('rating', rating.toString())

    try {
      // Envia os dados para api para a API
      await evaluationUpdate({ formData, userToken })
      // Fechar modal após envio da avaliação
      setRatingModal(false)

      // Retorno visual para o usuário
      toast.success('Avaliação Atualizada!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      })
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a nota. Tente novamente.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="mx-6 w-full rounded-lg bg-white px-6 pb-6 pt-4 shadow-lg transition-all hover:shadow-xl sm:w-auto sm:min-w-[26rem] sm:max-w-lg">
      <div className="flex w-full items-start justify-between">
        <Dialog.Title className="mt-2 font-bold text-zinc-500">Avaliação</Dialog.Title>
        <Dialog.Close asChild>
          <button>
            <MdClose fontSize={24} />
          </button>
        </Dialog.Close>
      </div>

      <div className="mt-4">
        {reviews?.userRating ? (
          <>
            <h2 className="mb-3 mt-4 text-lg font-medium leading-snug text-gray-800 sm:mt-2 sm:text-xl">
              Gostaria de reavaliar essa empresa? Informe sua nova avaliação.
            </h2>
          </>
        ) : (
          <>
            <h2 className="mb-3 mt-4 text-lg font-medium leading-snug text-gray-800 sm:mt-2 sm:text-xl">
              O que você achou dessa empresa? Avalie e ajude outros usuários.
            </h2>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-3">
        {/* Renderizar estrelas */}
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} onClick={() => setRating(star)} className="cursor-pointer">
            {star <= rating ? (
              <MdStar fontSize={32} className="text-yellow-400 transition-transform hover:scale-125" />
            ) : (
              <MdOutlineStarBorder fontSize={32} className="text-yellow-400 transition-transform hover:scale-110" />
            )}
          </span>
        ))}
      </div>

      <div className="mt-6">
        {reviews?.userRating ? (
          <button
            onClick={ratingUpdate}
            className="w-full rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700"
          >
            Reavaliar
          </button>
        ) : (
          <button
            onClick={createRating}
            className="w-full rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700"
          >
            Enviar Avaliação
          </button>
        )}
      </div>
    </div>
  )
}
