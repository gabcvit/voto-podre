import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import InfoList from '@/components/InfoList.vue'

describe('InfoList', () => {
  it('hides internal fields and renders friendly labels', () => {
    const wrapper = mount(InfoList, {
      props: {
        info: {
          id: 10,
          nome: 'Ana Silva',
          siglaPartido: 'PT',
          siglaUf: 'SP',
          idLegislatura: 57,
          email: 'ana@camara.leg.br',
          uri: 'hidden',
          uriPartido: 'hidden',
          urlFoto: 'hidden',
          redeSocial: ['hidden'],
        },
      },
    })

    expect(wrapper.text()).toContain('Informações completas')
    expect(wrapper.text()).toContain('Partido')
    expect(wrapper.text()).toContain('Estado')
    expect(wrapper.text()).toContain('Legislatura')
    expect(wrapper.text()).not.toContain('uriPartido')
    expect(wrapper.text()).not.toContain('urlFoto')
    expect(wrapper.text()).not.toContain('Redes sociais')
  })
})
