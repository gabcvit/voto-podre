import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'
import TheNavbar from '@/components/TheNavbar.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>home</div>' } },
    { path: '/glossario', component: { template: '<div>glossario</div>' } },
    { path: '/deputados', component: { template: '<div>deputados</div>' } },
    { path: '/pautas', component: { template: '<div>pautas</div>' } },
    { path: '/apoio', component: { template: '<div>apoio</div>' } },
  ],
})

describe('TheNavbar', () => {
  beforeEach(async () => {
    localStorage.clear()
    document.documentElement.className = ''
    setActivePinia(createPinia())
    await router.push('/')
    await router.isReady()
  })

  it('toggles the theme and persists the choice', async () => {
    const wrapper = mount(TheNavbar, {
      global: {
        plugins: [router],
      },
    })

    const themeButton = wrapper.findAll('button[aria-label="Mudar para modo escuro"]')[0]

    await themeButton.trigger('click')

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(wrapper.findAll('button[aria-label="Mudar para modo claro"]')).toHaveLength(2)
  })

  it('opens the mobile menu and closes it after navigation', async () => {
    const wrapper = mount(TheNavbar, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.get('button[aria-label="Abrir menu"]').trigger('click')

    expect(wrapper.get('#mobile-menu').exists()).toBe(true)

    const deputadosLink = wrapper
      .get('#mobile-menu')
      .findAll('a')
      .find((link) => link.text().includes('Deputados'))

    await deputadosLink!.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/deputados')
    expect(wrapper.find('#mobile-menu').exists()).toBe(false)
  })
})
