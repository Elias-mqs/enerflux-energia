'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdMenu } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

import { LargeHeaderButtons } from './ui/large-header-buttons'
import { SmallHeaderButtons } from './ui/small-header-buttons'

export function Header() {
  const pathname = usePathname()

  // Controla se abertura e fechamento
  const [isOpen, setIsOpen] = useState(false)

  const restrictedArea = pathname === '/company-registration'

  return (
    <header className="static top-0 flex w-full items-center justify-center border-b bg-gradient-to-r from-blue-600 to-blue-950 sm:sticky">
      <div className="flex h-auto min-h-20 w-full max-w-screen-xl flex-col-reverse items-center justify-between px-4 py-4 md:h-20 md:flex-row md:px-8 md:py-0">
        <div className={twMerge('flex w-full justify-between md:w-auto', restrictedArea ? 'mt-[-20px] md:mt-0' : '')}>
          <button>
            <Link href="/" className="flex">
              <Image alt="logo-header" src="/img/logo.png" width={60} height={50} />
              <div className="ml-2">
                <h1 className="mb-[-6px] mt-2 font-mono text-lg font-bold text-sky-100">Enerflux</h1>
                <h1 className="font-mono text-lg text-sky-100">energia</h1>
              </div>
            </Link>
          </button>

          <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {<MdMenu fontSize={28} color="#bfdbfe" />}
          </button>
        </div>

        <LargeHeaderButtons restrictedArea={restrictedArea} />

        <SmallHeaderButtons isOpen={isOpen} restrictedArea={restrictedArea} />
      </div>
    </header>
  )
}
