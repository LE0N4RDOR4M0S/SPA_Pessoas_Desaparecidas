import type { Pessoa } from './pessoa.type';

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface SearchFilters {
  nome?: string;
  status?: string;
  cidade?: string;
  estado?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: string;
}

export interface SubmissionFormData {
  observacao: string;
  localizacao?: string;
  fotos?: File[];
}

export interface ApiPaginatedResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Pessoa[];
  number: number;
}

