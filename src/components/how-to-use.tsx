export function HowToUse() {
  return (
    <>
      <header className="mb-8 p-8 text-center">
        <h2 className="text-3xl font-bold text-yellow-400 sm:text-4xl">Veja como é fácil usar a Enerflux</h2>

        <p className="mt-4 text-lg text-gray-200 sm:text-xl">
          Entenda o processo passo a passo para encontrar o fornecedor de energia ideal.
        </p>
      </header>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-lg bg-blue-800 p-6 shadow-lg transition-all hover:bg-blue-700">
          <header>
            <h3 className="mb-2 text-2xl font-semibold text-teal-300">Passo 1: Informe seu Consumo</h3>
          </header>
          <p className="text-base text-gray-200">
            Digite seu <span className="font-bold text-yellow-300">consumo</span> de energia mensal no campo indicado
            para começarmos a busca.
          </p>
        </article>

        <article className="rounded-lg bg-blue-800 p-6 shadow-lg transition-all hover:bg-blue-700">
          <header>
            <h3 className="mb-2 text-2xl font-semibold text-teal-300">Passo 2: Veja as Ofertas</h3>
          </header>
          <p className="text-base text-gray-200">
            Compare as melhores <span className="font-bold text-yellow-300">ofertas</span> de fornecedores
            personalizadas para você.
          </p>
        </article>

        <article className="rounded-lg bg-blue-800 p-6 shadow-lg transition-all hover:bg-blue-700">
          <header>
            <h3 className="mb-2 text-2xl font-semibold text-teal-300">Passo 3: Personalize sua Escolha</h3>
          </header>
          <p className="text-base text-gray-200">
            Filtre as ofertas de acordo com suas <span className="font-bold text-yellow-300">preferências</span>: preço,
            condições contratuais e mais.
          </p>
        </article>

        <article className="rounded-lg bg-blue-800 p-6 shadow-lg transition-all hover:bg-blue-700">
          <header>
            <h3 className="mb-2 text-2xl font-semibold text-teal-300">Passo 4: Contrate com Facilidade</h3>
          </header>
          <p className="text-base text-gray-200">
            Escolha o fornecedor que melhor atende suas <span className="font-bold text-yellow-300">necessidades</span>{' '}
            e faça a contratação de forma prática.
          </p>
        </article>
      </div>

      <aside className="mt-12 flex flex-col justify-center px-8">
        <p className="mb-4 text-center text-lg text-gray-200">
          Experimente nossa ferramenta de simulação ajustando o{' '}
          <span className="font-bold text-yellow-300">consumo</span> de energia para ver as melhores ofertas.
        </p>
      </aside>
    </>
  )
}
