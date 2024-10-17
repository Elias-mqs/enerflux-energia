import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import {
  MdAttachMoney,
  MdFlashOn,
  MdLocationOn,
  MdOutlineStarBorder,
  MdPeople,
  MdStar,
  MdStarHalf,
} from 'react-icons/md'

interface CompanyProfileProps {
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

export function CompanyProfile({ companyData }: CompanyProfileProps) {
  // Arredonda a nota para o valor mais próximo de 0.5
  const roundedRating = Math.round(companyData.rating * 2) / 2

  // Calcula quantas estrelas cheias, meias estrelas e vazias devem ser renderizadas
  const fullStars = Math.floor(roundedRating)
  const hasHalfStar = roundedRating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  return (
    <div className="mx-6 mt-6 w-full rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl sm:w-auto sm:min-w-96">
      {/* Logo e Nome */}
      <div className="text-center">
        <Avatar className="mx-auto mb-4 flex items-center justify-center">
          <AvatarImage className="h-24 w-24 rounded-full" src={companyData.srcLogo} />
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
          <span className="text-sm text-gray-600">R$ {companyData.costPerKwh.toFixed(2)}</span>
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
          <span className="text-sm text-gray-600">{companyData.totalClients.toLocaleString()}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-t-2 border-gray-200" />

      {/* Avaliação */}
      <div className="flex flex-col items-center justify-between">
        <span className="text-sm font-semibold text-gray-600">Avaliação</span>
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

      {/* Botão de Fechar */}
      <Dialog.Close className="mt-6 block w-full rounded-lg bg-blue-600 p-3 text-center font-semibold text-white hover:bg-blue-700">
        Fechar
      </Dialog.Close>
    </div>
  )
}
