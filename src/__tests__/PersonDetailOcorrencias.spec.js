import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PersonDetailOcorrencias from '../components/domain/PersonDetailOcorrencias.vue'

describe('PersonDetailOcorrencias', () => {
  it('exibe mensagem quando não há ocorrências', () => {
    const wrapper = mount(PersonDetailOcorrencias, {
      props: {
        ocorrencias: [],
        ocorrenciasLoading: false,
        ocorrenciasError: '',
        ocorrenciasPageList: [],
        ocorrenciasShown: 0,
        sortOrder: 'desc',
        filterStartDate: '',
        filterEndDate: '',
        onlyWithAttachment: false
      }
    })
    expect(wrapper.text()).toMatch(/Nenhuma ocorrência detalhada encontrada\./i)
  })

  it('exibe ocorrências quando presentes', () => {
    const ocorrencias = [
      { id: 1, ocoId: 123, data: '2024-01-01', informacao: 'Visto no centro', anexos: [] }
    ]
    const wrapper = mount(PersonDetailOcorrencias, {
      props: {
        ocorrencias,
        ocorrenciasLoading: false,
        ocorrenciasError: '',
        ocorrenciasPageList: ocorrencias,
        ocorrenciasShown: 1,
        sortOrder: 'desc',
        filterStartDate: '',
        filterEndDate: '',
        onlyWithAttachment: false
      }
    })
    expect(wrapper.text()).toContain('Visto no centro')
    expect(wrapper.html()).toMatch('01-01-2024')
  })

  it('exibe anexos quando presentes', () => {
    const ocorrencias = [
      { id: 2, ocoId: 124, data: '2024-02-15', informacao: 'Avistado no parque', anexos: ['https://site.com/foto.jpg'] }
    ]
    const wrapper = mount(PersonDetailOcorrencias, {
      props: {
        ocorrencias,
        ocorrenciasLoading: false,
        ocorrenciasError: '',
        ocorrenciasPageList: ocorrencias,
        ocorrenciasShown: 1,
        sortOrder: 'desc',
        filterStartDate: '',
        filterEndDate: '',
        onlyWithAttachment: false
      }
    })
    expect(wrapper.text()).toContain('Avistado no parque')
    expect(wrapper.html()).toMatch('15-02-2024')
    expect(wrapper.html()).toContain('Anexos:')
    expect(wrapper.html()).toContain('foto.jpg')
  })

  it('exibe loading corretamente', () => {
    const wrapper = mount(PersonDetailOcorrencias, {
      props: {
        ocorrencias: [],
        ocorrenciasLoading: true,
        ocorrenciasError: '',
        ocorrenciasPageList: [],
        ocorrenciasShown: 0,
        sortOrder: 'desc',
        filterStartDate: '',
        filterEndDate: '',
        onlyWithAttachment: false
      }
    })
    expect(wrapper.text()).toMatch(/Carregando ocorrências/i)
  })

  it('exibe erro corretamente', () => {
    const wrapper = mount(PersonDetailOcorrencias, {
      props: {
        ocorrencias: [],
        ocorrenciasLoading: false,
        ocorrenciasError: 'Erro de teste',
        ocorrenciasPageList: [],
        ocorrenciasShown: 0,
        sortOrder: 'desc',
        filterStartDate: '',
        filterEndDate: '',
        onlyWithAttachment: false
      }
    })
    expect(wrapper.text()).toContain('Erro de teste')
  })
})
