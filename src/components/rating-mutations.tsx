import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useRatingMutations() {
  const queryClient = useQueryClient()

  // Função para envio da avaliação e atualização de querie de busca
  const { mutateAsync: submitReview } = useMutation({
    mutationFn: async ({ formData, userToken }: { formData: FormData; userToken: string }) => {
      await axios.post(`register-evaluation`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      })
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['search-supplier', 'list-companies'] })
    },
  })

  // Função para envio da atualização da avaliação e atualização da querie de busca
  const { mutateAsync: evaluationUpdate } = useMutation({
    mutationFn: async ({ formData, userToken }: { formData: FormData; userToken: string }) => {
      await axios.patch(`rating-update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      })
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['search-supplier', 'list-companies'] })
    },
  })

  return {
    submitReview,
    evaluationUpdate,
  }
}
