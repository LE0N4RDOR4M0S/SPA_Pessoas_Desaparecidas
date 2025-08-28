import apiClient from './apiClient'

export interface OcorrenciaInfo {
  ocoId: number;
  informacao: string;
  data: string;
  id: number;
  anexos: string[];
}

export const ocorrenciaService = {
  async getInformacoesDesaparecido(ocorrenciaId: number): Promise<OcorrenciaInfo[]> {
    const response = await apiClient.get<OcorrenciaInfo[]>(
      '/ocorrencias/informacoes-desaparecido',
      { params: { ocorrenciaId } }
    )
    return response.data
  },
  async addInformacaoDesaparecido(ocorrenciaId: number, informacao: string, anexos: string[]): Promise<OcorrenciaInfo> {
    const response = await apiClient.post<OcorrenciaInfo>('/ocorrencias/informacoes-desaparecido', {
      ocorrenciaId,
      informacao,
      anexos
    })
    return response.data
  }
}
