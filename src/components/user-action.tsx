import Image from 'next/image'
import { FaArrowRightLong } from 'react-icons/fa6'

export function UserAction() {
  return (
    <>
      <div className="mr-0 w-auto pl-0 md:mr-[-24px] md:pl-24">
        <Image alt="graphic" src="/img/graphic.png" width={500} height={500} />
      </div>
      <div className="mx-4 w-full max-w-7xl rounded-3xl px-4 py-4 shadow-lg md:px-0">
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-900">Informe seu consumo de energia</h2>
        <p className="mb-4 text-center text-lg text-gray-700">Exemplo: 30000 kWh</p>

        <form className="flex flex-col items-center">
          <div className="flex w-full justify-center rounded-full border-2 p-1 md:w-4/5">
            <input
              type="number"
              min="1"
              placeholder="Consumo mensal (kWh)"
              className="h-full w-full rounded-s-full border border-gray-300 p-3"
              // value={consumption}
              // onChange={(e) => setConsumption(e.target.value)}
            />
            <button
              type="submit"
              className="flex h-auto items-center rounded-e-full bg-blue-600 px-4 text-white transition duration-200 hover:bg-blue-500"
            >
              <p className="mr-0 hidden whitespace-nowrap sm:mr-3 sm:block">Encontrar </p>
              <FaArrowRightLong size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
