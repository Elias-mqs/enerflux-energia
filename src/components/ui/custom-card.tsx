import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { FaArrowRightLong } from 'react-icons/fa6'
import { MdOutlineStarBorder, MdStar, MdStarHalf } from 'react-icons/md'

import { CompanyProfile } from './company-profile'

interface CustomCardProps {
  companyData: {
    name: string
    srcLogo: string
    rating: number
    state: string // Estado de origem
    costPerKwh: number // Custo por kWh
    minKwh: number // Limite mínimo de kWh
    totalClients: number // Número total de clientes
  }
}

export function CustomCard({ companyData }: CustomCardProps) {
  // Arredonda a nota para o valor mais próximo de 0.5
  const roundedRating = Math.round(companyData.rating * 2) / 2

  // Calcula quantas estrelas cheias, meias estrelas e vazias devem ser renderizadas
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex max-h-28 min-h-24 min-w-full max-w-md cursor-pointer rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-sm transition-all hover:shadow-md">
          <Avatar className="flex w-24 items-center">
            <AvatarImage className="size-16 rounded-full" src={companyData.srcLogo} />
          </Avatar>

          <div className="ml-6 flex w-full flex-col justify-between">
            <p className="font-semibold text-zinc-800">{companyData.name}</p>
            <div className="flex pb-1">
              {/* Renderiza estrelas cheias */}
              {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                  <MdStar key={index} color="#facc15" size={24} />
                ))}

              {/* Renderiza meia estrela, se necessário */}
              {hasHalfStar && <MdStarHalf color="#facc15" size={24} />}

              {/* Renderiza estrelas vazias */}
              {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                  <MdOutlineStarBorder key={index} color="#facc15" size={24} />
                ))}
            </div>
          </div>
          <div className="pt-auto flex items-center border-l border-zinc-300 pl-2">
            <FaArrowRightLong size={18} color="#000" />
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center">
          <CompanyProfile companyData={companyData} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
