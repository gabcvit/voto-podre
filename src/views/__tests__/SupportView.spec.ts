import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SupportView from '@/views/SupportView.vue'

vi.mock('@/composables/useMeta', () => ({
  useMeta: vi.fn(),
}))

describe('SupportView', () => {
  const writeText = vi.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    writeText.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('copies the PIX key and shows temporary feedback', async () => {
    const wrapper = mount(SupportView)

    await wrapper.get('button').trigger('click')

    expect(writeText).toHaveBeenCalledWith('32eea521-52c1-4048-92e0-bdcc9233efb5')
    expect(wrapper.text()).toContain('Chave copiada!')

    vi.advanceTimersByTime(2500)
    await nextTick()

    expect(wrapper.text()).toContain('Copiar chave PIX')
  })
})
