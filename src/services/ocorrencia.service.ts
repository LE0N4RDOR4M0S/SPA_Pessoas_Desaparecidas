import apiClient from './apiClient'
import type { OcorrenciaInfo } from '@/types/ocorrencia.type'

export const ocorrenciaService = {
  async getInformacoesDesaparecido(ocorrenciaId: number): Promise<OcorrenciaInfo[]> {
    const response = await apiClient.get<OcorrenciaInfo[]>(
      '/ocorrencias/informacoes-desaparecido',
      { params: { ocorrenciaId } }
    )
    return response.data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
  },

  async addInformacaoDesaparecido(payload: FormData): Promise<OcorrenciaInfo> {
    const response = await apiClient.post<OcorrenciaInfo>(
      '/ocorrencias/informacoes-desaparecido',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  }
}
