import Image from 'next/image'
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { LuFileSearch } from 'react-icons/lu'

export function HeroSection() {
  return (
    <>
      <div className="absolute flex h-full w-full max-w-7xl flex-col items-center px-8 pt-16">
        <h1 className="text-center text-2xl font-bold leading-tight text-white sm:max-w-7xl sm:text-3xl lg:text-5xl">
          Compare, economize e <span className="text-yellow-400">escolha o fornecedor</span> de energia{' '}
          <span className="text-green-400">ideal</span>!
        </h1>

        <div className="mt-12 flex flex-col gap-6 px-12 sm:mt-4 md:mt-16 md:flex-row md:gap-8 lg:gap-10">
          <div className="flex items-center gap-2">
            <FaBalanceScaleLeft color="#20B2AA" fontSize={22} />
            <h2 className="text-sm text-white sm:text-base md:text-lg lg:text-xl">Compare e economize</h2>
          </div>

          <div className="flex items-center gap-2">
            <IoSettingsOutline color="#20B2AA" fontSize={22} />
            <h2 className="text-sm text-white sm:text-base md:text-lg lg:text-xl">Simplicidade e Praticidade</h2>
          </div>

          <div className="flex items-center gap-2">
            <LuFileSearch color="#20B2AA" fontSize={22} />
            <h2 className="text-sm text-white sm:text-base md:text-lg lg:text-xl">Acessível e Transparente</h2>
          </div>
        </div>
      </div>

      <div>
        <Image
          alt="background-hero"
          src="/img/background-hero.png"
          layout="fill"
          style={{ opacity: 0.2, objectFit: 'cover' }}
        />
      </div>
    </>
  )
}
