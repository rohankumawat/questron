'use client'

import Link from 'next/link'
import { Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-transparent shadow-md relative">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-[#0c4a6e] dark:text-[#e0f2fe] transition-colors duration-300 hover:text-[#0ea5e9] dark:hover:text-[#7dd3fc]">
            <Brain className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">QuizGen</span>
          </Link>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
            <NavLink href="/" active={pathname === '/'}>
              Home
            </NavLink>
            <NavLink href="/blogs" active={pathname === '/blogs'}>
              Blogs
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

interface NavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link href={href} className="relative">
      <motion.span
        className={`text-lg ${
          active
            ? 'text-[#0ea5e9] dark:text-[#7dd3fc]'
            : 'text-[#0c4a6e] dark:text-[#e0f2fe]'
        } transition-colors duration-300 hover:text-[#0ea5e9] dark:hover:text-[#7dd3fc]`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0ea5e9] dark:bg-[#7dd3fc]"
          layoutId="underline"
          initial={false}
        />
      )}
    </Link>
  )
}