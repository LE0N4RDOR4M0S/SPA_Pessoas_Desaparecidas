export type Sexo = 'MASCULINO' | 'FEMININO' | 'OUTRO';
export type TipoCartaz = 'PDF_DESAPARECIDO' | 'IMAGEM_LOCALIZADO'

export interface Cartaz {
  urlCartaz: string;
  tipoCartaz: TipoCartaz;
}

export interface DetalhesOcorrencia {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean | null;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: DetalhesOcorrencia;
  listaCartaz: Cartaz[];
  ocoId: number;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: Sexo;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

export type StatusPessoa = 'DESAPARECIDO' | 'LOCALIZADO';

export interface PessoaComStatus extends Pessoa {
  status: StatusPessoa;
}
