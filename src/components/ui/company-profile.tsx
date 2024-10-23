'use client'

import { useState } from 'react'

import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { signIn, useSession } from 'next-auth/react'
import {
  MdAttachMoney,
  MdFlashOn,
  MdLocationOn,
  MdOutlineStarBorder,
  MdPeople,
  MdStar,
  MdStarHalf,
} from 'react-icons/md'
import { toast } from 'react-toastify'

import { CompanyPropsTeste } from '../supplier-list'

import { RatingModal } from './rating-modal'

export function CompanyProfile({ companyData }: { companyData: CompanyPropsTeste }) {
  const { data: userSession, status } = useSession()

  const [ratingModal, setRatingModal] = useState(false)

  // Arredonda a nota para uma casa decimal
  const roundedRatingTotal = Math.round(companyData.averageRating * 10) / 10

  // Arredonda a nota para o valor mais próximo de 0.5 para compor as estrelas
  const roundedRatingStar = Math.round(companyData.averageRating * 2) / 2

  // Calcula quantas estrelas cheias, meias estrelas e vazias devem ser renderizadas
  const fullStars = Math.floor(roundedRatingStar)
  const hasHalfStar = roundedRatingStar % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const leaveReview = async () => {
    if (status !== 'authenticated') {
      toast.info('Você deve fazer login antes inserir uma avaliação.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setTimeout(async () => await signIn('google', { redirect: false }), 3000)
    }

    setRatingModal(true)
  }

  return (
    <div className="mx-6 mt-6 w-full rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl sm:w-auto sm:min-w-96">
      {/* Logo e Nome */}
      <div className="text-center">
        <Avatar className="mx-auto mb-4 flex items-center justify-center">
          <AvatarImage className="h-24 w-24 rounded-full" src={companyData.logoImg} />
        </Avatar>
        <Dialog.Title className="text-2xl font-bold text-gray-800">{companyData.name}</Dialog.Title>
      </div>

      {/* Informações da Empresa */}
      <div className="mt-4 space-y-4 text-gray-700">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center text-base font-semibold">
            <MdLocationOn className="mr-1 text-blue-600" size={18} />
            Localização:
          </span>
          <span className="text-sm text-gray-600">{companyData.state}</span>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center text-base font-semibold">
            <MdAttachMoney className="mr-1 text-green-600" size={18} />
            Custo por kWh:
          </span>
          <span className="text-sm text-gray-600">R$ {companyData.costKwh.toFixed(2)}</span>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center text-base font-semibold">
            <MdFlashOn className="mr-1 text-yellow-500" size={18} />
            Limite mínimo de kWh:
          </span>
          <span className="text-sm text-gray-600">{companyData.minKwh} kWh</span>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center text-base font-semibold">
            <MdPeople className="mr-1 text-purple-600" size={18} />
            Total de clientes:
          </span>
          <span className="text-sm text-gray-600">
            {companyData.clients ? companyData.clients.toLocaleString() : 0}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Avaliação */}
      <div className="flex flex-col items-center justify-between">
        <span className="mb-0.5 text-sm font-semibold text-gray-600">Avaliação</span>
        <div className="ml-4 flex items-end pb-1">
          <span className="mr-4 font-semibold text-zinc-600">{roundedRatingTotal}</span>
          {/* Renderiza estrelas cheias */}
          {Array(fullStars)
            .fill(0)
            .map((_, index) => (
              <MdStar key={index} color="#facc15" size={28} />
            ))}

          {/* Renderiza meia estrela, se necessário */}
          {hasHalfStar && <MdStarHalf color="#facc15" size={28} />}

          {/* Renderiza estrelas vazias */}
          {Array(emptyStars)
            .fill(0)
            .map((_, index) => (
              <MdOutlineStarBorder key={index} color="#facc15" size={28} />
            ))}
          <span className="ml-4 font-semibold text-zinc-600">({companyData.totalReviews})</span>
        </div>
      </div>

      {/* Botão de avaliação */}
      <Dialog.Root open={ratingModal} onOpenChange={setRatingModal}>
        <Dialog.Trigger asChild>
          <button
            onClick={leaveReview}
            className="mt-4 block w-full rounded-lg border-2 border-blue-600 p-3 text-center font-semibold text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white active:translate-y-0.5"
          >
            Deixe sua avaliação
          </button>
        </Dialog.Trigger>
        {userSession && (
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center">
              <Dialog.DialogDescription></Dialog.DialogDescription>
              <RatingModal userSession={userSession} companyId={companyData.id} setRatingModal={setRatingModal} />
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>

      {/* Botão de Fechar */}
      <Dialog.Close asChild>
        <button className="mt-4 block w-full rounded-lg bg-blue-600 p-3 text-center font-semibold text-white hover:bg-blue-700">
          Fechar
        </button>
      </Dialog.Close>
    </div>
  )
}
