import './PersonDetailOcorrencias.spec.js'
import './HomePage.spec.js'
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renderiza o header principal', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          RouterLink: true,
          TheHeader: true
        }
      }
    })
    expect(wrapper.html()).toContain('<the-header-stub')
  })

  it('possui o slot de router-view', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          RouterLink: true,
          TheHeader: true
        }
      }
    })
    expect(wrapper.html()).toContain('<router-view-stub')
  })

  it('tem estrutura principal da SPA', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          RouterLink: true,
          TheHeader: true
        }
      }
    })
    expect(wrapper.classes()).toContain('min-h-screen')
    expect(wrapper.html()).toContain('main')
  })
})
