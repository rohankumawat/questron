'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface SlidingWindowProps {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
}

export function SlidingWindow({ children, isOpen, onClose }: SlidingWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed bottom-0 right-0 w-full h-[90vh] bg-white rounded-t-3xl shadow-lg z-50 overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="absolute top-4 left-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-black/10"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

