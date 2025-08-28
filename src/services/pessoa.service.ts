import apiClient from './apiClient'
import type { ApiPaginatedResponse, SearchFilters } from '@/types/api'
import type { Pessoa, PessoaComStatus, StatusPessoa } from '@/types/pessoa.type'
import type { PaginatedResponse } from '@/types/api'

function adicionarStatus(pessoa: Pessoa): PessoaComStatus {
  const status: StatusPessoa =
    pessoa.ultimaOcorrencia.dataLocalizacao
      ? 'LOCALIZADO'
      : 'DESAPARECIDO'
  return { ...pessoa, status }
}

export const peopleService = {
  async getPeople(
    page: number = 0,
    porPagina: number = 10,
    filters: SearchFilters = {},
  ): Promise<PaginatedResponse<PessoaComStatus>> {
    const response = await apiClient.get<ApiPaginatedResponse>('/pessoas/aberto/filtro', {
      params: {
        pagina: page,
        porPagina,
        ...filters,
      },
    })

    const dadosApi = response.data

    const contentComStatus = dadosApi.content.map(adicionarStatus)

    return {
      content: contentComStatus,
      page: dadosApi.number,
      size: dadosApi.size,
      totalPages: dadosApi.totalPages,
      totalElements: dadosApi.totalElements,
    }
  },

  async getPersonById(id: string | number): Promise<PessoaComStatus> {
    const response = await apiClient.get<Pessoa>(`/pessoas/${id}`)
    return adicionarStatus(response.data)
  },
}
