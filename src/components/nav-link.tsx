'use client'

import { ComponentProps } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const pathName = usePathname()

  return (
    <Link
      {...props}
      prefetch={false}
      data-current={pathName === props.href}
      className="text-muted-foreground hover:text-primary data-[current=true]:text-primary text-sm font-medium transition-colors"
    />
  )
}
