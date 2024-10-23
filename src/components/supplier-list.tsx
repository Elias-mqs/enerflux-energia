'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FaArrowTurnUp } from 'react-icons/fa6'

import { getBaseUrl } from '@/lib/client'

import { CustomCard } from './ui/custom-card'

export interface CompanyPropsTeste {
  id: string
  name: string
  minKwh: number
  clients: number | null
  costKwh: number
  logoImg: string
  state: string
  averageRating: number
  totalReviews: number
}

export function SupplierList() {
  const searchParams = useSearchParams()

  // Função para fazer a busca de acordo com o parametro da query
  const { data: companies } = useQuery({
    queryKey: ['search-supplier', 'list-companies', searchParams.get('min-kwh')],
    queryFn: async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}get-companies?min-kwh=${searchParams.get('min-kwh')}`)
        return response.data as CompanyPropsTeste[]
      } catch (err) {
        console.error('Erro com requisição, contate o suporte', err)
      }
    },
    enabled: !!searchParams.get('min-kwh'),
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  })

  // Rolar até o input de busca
  const scrollToSection = () => {
    const section = document.getElementById('user-action')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="flex w-full max-w-7xl flex-col justify-center py-12">
      {!companies ? (
        <div className="flex w-full flex-col items-center">
          <Image src="/img/add-information.png" alt="add-information" width={600} height={600} />

          <div className="mx-8 mt-6 flex flex-col items-center gap-4 rounded-3xl border-2 border-blue-400 bg-blue-50 px-4 py-6 shadow-lg md:flex-row">
            <h1 className="text-center text-2xl font-bold text-blue-800">
              Informe seu <span className="text-blue-600">consumo</span> e dê um{' '}
              <span className="text-blue-600">match</span> com seus <span className="text-blue-600">fornecedores</span>!
            </h1>

            <button
              onClick={scrollToSection}
              className="w-full rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg active:scale-100 md:w-auto"
            >
              <FaArrowTurnUp size={24} style={{ margin: 'auto' }} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="mx-8 rounded-lg px-4 py-4 text-center font-sans text-4xl font-bold text-white md:mx-8 md:px-0">
              Conectando você aos melhores fornecedores
            </h1>

            <p className="mb-6 text-center text-xl text-zinc-100">Faça sua escolha e impulsione seu sucesso</p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:grid-cols-3">
            {companies.map((company, index) => (
              <div
                className="transform text-white shadow-md transition-transform hover:scale-105 hover:shadow-2xl"
                key={index}
              >
                <CustomCard companyData={company} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
