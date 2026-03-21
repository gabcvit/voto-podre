import type { Tema } from '@/types'

export const TEMA_CONFIG: Record<Tema, { emoji: string; colorClass: string; buttonActiveClass: string }> = {
    'segurança pública': {
        emoji: '🔒',
        colorClass: 'text-blue-500 dark:text-blue-400',
        buttonActiveClass: 'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400',
    },
    'direitos humanos': {
        emoji: '✊',
        colorClass: 'text-purple-500 dark:text-purple-400',
        buttonActiveClass: 'border-purple-500 text-purple-500 dark:border-purple-400 dark:text-purple-400',
    },
    'meio ambiente': {
        emoji: '🌿',
        colorClass: 'text-emerald-500 dark:text-emerald-400',
        buttonActiveClass: 'border-emerald-500 text-emerald-500 dark:border-emerald-400 dark:text-emerald-400',
    },
    'democracia': {
        emoji: '🗳️',
        colorClass: 'text-amber-500 dark:text-amber-400',
        buttonActiveClass: 'border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400',
    },
    'educação': {
        emoji: '📚',
        colorClass: 'text-sky-500 dark:text-sky-400',
        buttonActiveClass: 'border-sky-500 text-sky-500 dark:border-sky-400 dark:text-sky-400',
    },
    'saúde': {
        emoji: '❤️',
        colorClass: 'text-rose-500 dark:text-rose-400',
        buttonActiveClass: 'border-rose-500 text-rose-500 dark:border-rose-400 dark:text-rose-400',
    },
}
