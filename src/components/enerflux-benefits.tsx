import { BsFillLightningChargeFill } from 'react-icons/bs'
import { FaBalanceScale } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

export function EnerfluxBenefits() {
  return (
    <>
      <div className="max-w-2xl px-8 text-start">
        <h2 className="mb-4 text-lg font-bold text-blue-900 md:text-xl">Por que Enerflux?</h2>

        <p className="mb-2 text-xl font-bold leading-tight md:text-2xl">
          A Enerflux facilita a escolha do fornecedor ideal. Informe seu consumo de energia e encontre as melhores
          opções personalizadas para suas necessidades.
        </p>

        <p className="font-sans text-lg text-zinc-500">Pesquise, compare e escolha seu melhor fornecedor de energia.</p>
      </div>

      <div className="max-w-3xl px-8 pt-8 md:pt-0">
        <article className="flex items-center gap-8">
          <FaBalanceScale size="128px" color="#2563eb" />
          <div>
            <h3 className="mb-1 text-lg font-bold text-blue-700 md:text-xl">Compare e Economize</h3>

            <p className="text-base text-zinc-500 md:text-lg">
              Receba comparações rápidas e eficientes entre diversos fornecedores. Não perca a oportunidade de escolher
              o plano mais vantajoso.
            </p>
          </div>
        </article>

        <article className="mt-8 flex items-center gap-8">
          <BsFillLightningChargeFill size="128px" color="#2563eb" />
          <div>
            <h3 className="mb-1 text-lg font-bold text-blue-700 md:text-xl">Simplicidade e Praticidade</h3>

            <p className="text-base text-zinc-500 md:text-lg">
              Nosso sistema faz todo o trabalho pesado. Informe seu consumo e deixe a tecnologia calcular e sugerir o
              melhor plano para você.
            </p>
          </div>
        </article>

        <article className="mt-8 flex items-center gap-8">
          <IoMdCheckmarkCircleOutline size="128px" color="#2563eb" />
          <div>
            <h3 className="mb-1 text-lg font-bold text-blue-700 md:text-xl">Acessível e Transparente</h3>

            <p className="text-base text-zinc-500 md:text-lg">
              Todas as informações estão ao seu alcance. Não há taxas ocultas ou detalhes complicados, tudo de forma
              clara e transparente.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}
