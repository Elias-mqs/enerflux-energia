'use client'

import { useState } from 'react'

import Link from 'next/link'
import { MdMenu } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex w-full items-center justify-center border-b bg-gradient-to-r from-blue-600 to-blue-950">
      <div className="flex h-auto min-h-20 w-full max-w-screen-xl flex-col-reverse items-center justify-between px-8 py-4 md:h-20 md:flex-row md:py-0">
        <div className="flex w-full justify-between md:w-auto">
          <button>
            <Link href="/">
              <h1 className="font-mono text-xl font-bold text-blue-100">Enerflux</h1>
              <h1 className="font-mono text-xl text-blue-100">energia</h1>
            </Link>
          </button>

          <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {<MdMenu fontSize={28} color="#bfdbfe" />}
          </button>
        </div>

        <div className="hidden items-center justify-end space-x-16 md:flex">
          <button className="font-bold text-blue-200 transition-transform hover:scale-110">Buscar fornecedores</button>
          <button className="font-bold text-blue-200 transition-transform hover:scale-110">Opções</button>

          <button className="rounded-3xl px-6 py-1 text-blue-300 transition-transform hover:scale-110">
            <Link href="/" prefetch={false}>
              Área Restrita
            </Link>
          </button>
        </div>

        <div
          className={twMerge(
            'mb-4 flex max-h-full flex-col-reverse items-center justify-center gap-4 transition-all md:hidden',
            isOpen ? 'h-full' : 'm-[-2] h-0 overflow-hidden',
          )}
        >
          <button className="font-bold text-blue-200 transition-transform hover:scale-110">Buscar fornecedores</button>
          <button className="font-bold text-blue-200 transition-transform hover:scale-110">Opções</button>

          <button className="rounded-3xl px-6 py-1 text-blue-300 transition-transform hover:scale-110">
            <Link href="/upload" prefetch={false}>
              Área Restrita
            </Link>
          </button>
        </div>
      </div>
    </header>
  )
}
