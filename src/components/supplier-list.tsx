import Image from 'next/image'
import { FaArrowTurnUp } from 'react-icons/fa6'

import { CustomCard } from './ui/custom-card'

interface CompanyPropsTeste {
  name: string
  srcLogo: string
  rating: number
  state: string // Estado de origem
  costPerKwh: number // Custo por kWh
  minKwh: number // Limite mínimo de kWh
  totalClients: number // Número total de clientes
}

export function SupplierList() {
  const companies: CompanyPropsTeste[] = [
    {
      name: 'Elias Marques Cruz',
      srcLogo:
        'https://media.licdn.com/dms/image/v2/D4D03AQH3NGZZKi1RRQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723635282022?e=1734566400&v=beta&t=HnlBsuJiCaWL3TQYIoyiN-y_6xyp0tmDvkFqpjbkJqQ',
      rating: 4.5,
      state: 'Mato Grosso do Sul',
      costPerKwh: 0.35,
      minKwh: 200,
      totalClients: 4500,
    },
    {
      name: 'Solar Energy Solutions',
      srcLogo: 'https://logos-world.net/wp-content/uploads/2021/10/Tesla-Logo-700x394.png',
      rating: 4.2,
      state: 'São Paulo',
      costPerKwh: 0.4,
      minKwh: 300,
      totalClients: 12000,
    },
    {
      name: 'PowerGrid Corp',
      srcLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      rating: 3.8,
      state: 'Minas Gerais',
      costPerKwh: 0.5,
      minKwh: 150,
      totalClients: 8900,
    },
    {
      name: 'EcoEnergy Innovations',
      srcLogo: 'https://1000logos.net/wp-content/uploads/2020/09/Logo-Nike-500x281.png',
      rating: 4.7,
      state: 'Rio de Janeiro',
      costPerKwh: 0.45,
      minKwh: 250,
      totalClients: 13400,
    },
    {
      name: 'VoltPro Electric',
      srcLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_2013_Google.png/640px-Logo_2013_Google.png',
      rating: 4.1,
      state: 'Bahia',
      costPerKwh: 0.38,
      minKwh: 180,
      totalClients: 7200,
    },
    {
      name: 'Energia Pura Ltda',
      srcLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Twitter_Logo.svg/600px-Twitter_Logo.svg.png',
      rating: 3.9,
      state: 'Paraná',
      costPerKwh: 0.42,
      minKwh: 160,
      totalClients: 6000,
    },
    {
      name: 'Global Solar Co.',
      srcLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg',
      rating: 4.0,
      state: 'Pernambuco',
      costPerKwh: 0.37,
      minKwh: 200,
      totalClients: 9800,
    },
    {
      name: 'Bright Future Energies',
      srcLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Logo_de_L%27Oreal.svg/600px-Logo_de_L%27Oreal.svg.png',
      rating: 4.3,
      state: 'Santa Catarina',
      costPerKwh: 0.44,
      minKwh: 220,
      totalClients: 11000,
    },
    {
      name: 'Future Power Solutions',
      srcLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/640px-Apple-logo.png',
      rating: 3.6,
      state: 'Rio Grande do Sul',
      costPerKwh: 0.48,
      minKwh: 300,
      totalClients: 7800,
    },
    {
      name: 'GreenPower Enterprises',
      srcLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
      rating: 4.8,
      state: 'Espírito Santo',
      costPerKwh: 0.36,
      minKwh: 210,
      totalClients: 15500,
    },
  ]

  // const companies: { name: string; srcLogo: string; rating: number }[] = []

  return (
    <div className="flex w-full max-w-7xl flex-col justify-center py-12">
      {companies.length > 0 ? (
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
      ) : (
        <div className="flex w-full flex-col items-center">
          <Image src="/img/add-information.png" alt="add-information" width={600} height={600} />

          <div className="mx-8 mt-6 flex flex-col items-center gap-4 rounded-3xl border-2 border-blue-400 bg-blue-50 px-4 py-6 shadow-lg md:flex-row">
            <h1 className="text-center text-2xl font-bold text-blue-800">
              Informe seu <span className="text-blue-600">consumo</span> e dê um{' '}
              <span className="text-blue-600">match</span> com seus <span className="text-blue-600">fornecedores</span>!
            </h1>

            <button className="w-full rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg md:w-auto">
              <FaArrowTurnUp size={24} style={{ margin: 'auto' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
