import { Suspense } from 'react'

import { EnerfluxBenefits } from '@/components/enerflux-benefits'
import { HeroSection } from '@/components/hero-section'
import { HowToUse } from '@/components/how-to-use'
import { SupplierList } from '@/components/supplier-list'
import { UserAction } from '@/components/user-action'

export default function Home() {
  return (
    <main className="flex-1">
      <div className="flex w-full flex-col items-center justify-center">
        <section className="relative flex h-96 w-full justify-center bg-gradient-to-r from-blue-600 to-blue-950 px-8">
          <HeroSection />
        </section>

        <section className="flex w-full max-w-screen-xl flex-col items-center py-12 md:flex-row">
          <EnerfluxBenefits />
        </section>

        <section className="flex h-auto w-full flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-950 pb-12 pt-6 text-white">
          <HowToUse />
        </section>

        <section
          id="user-action"
          className="flex w-full max-w-screen-xl flex-col items-center px-8 py-12 md:flex-row md:px-0"
        >
          <Suspense>
            <UserAction />
          </Suspense>
        </section>

        <section className="flex w-full justify-center border-b bg-gradient-to-br from-blue-600 to-blue-950">
          <Suspense>
            <SupplierList />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
