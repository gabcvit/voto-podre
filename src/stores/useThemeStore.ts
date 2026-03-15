import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') !== 'light')

  function toggle() {
    isDark.value = !isDark.value
  }

  watch(
    isDark,
    (dark) => {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    },
    { immediate: true },
  )

  return { isDark, toggle }
})
