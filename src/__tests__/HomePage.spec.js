import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '../views/HomePage.vue'

describe('HomePage', () => {
  it('renderiza o título principal', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: ['PeopleList', 'BaseSpinner', 'BasePagination']
      }
    })
    expect(wrapper.text()).toMatch(/Registros Atuais/i)
  })

  it('exibe o campo de busca por nome', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: ['PeopleList', 'BaseSpinner', 'BasePagination']
      }
    })
    expect(wrapper.find('input#nome').exists()).toBe(true)
  })

  it('exibe botão de busca avançada', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: ['PeopleList', 'BaseSpinner', 'BasePagination']
      }
    })
    expect(wrapper.text()).toMatch(/busca avançada/i)
  })

  it('exibe spinner quando isLoading', () => {
    const wrapper = mount(HomePage, {
      data() {
        return { isLoading: true }
      },
      global: {
        stubs: ['PeopleList', 'BaseSpinner', 'BasePagination']
      }
    })
    expect(wrapper.findComponent({ name: 'BaseSpinner' }).exists()).toBe(true)
  })
})
