export interface SolicitacaoDetalheResponse {
  NU_IDNTR_SLTCO_MASSA_DADO: number;
  NO_SERVICO_DADO: string;
  DT_ABERTURA_SOLICITACAO: Date;
  DT_ABERTURA_FORMATADA: string;
  AMBIENTES: string;
  IC_SITUACAO_SLTCO: string;
  CO_USUARIO: string;
  NO_USUARIO: string;
  USUARIOS: string;
  DH_INICIO_ATENDIMENTO_SLTCO: string;
  DH_FIM_ATENDIMENTO_SLTCO: string;
  DH_INICIO_FMT: string;
  DH_FIM_FMT: string; // 2024-05-02 10:30:00.0
  SISTEMAS: string;
  QT_MINUTO_ATENDIMENTO: number;
  QT_REGISTRO_SLTCO: number;
  NO_AREA_NEGOCIO: string;
  NO_TIPO_MASSA_DADO: string;
  NO_DEMANDA_UTZCO_MASSA_DADO: string;
  NU_SERVICO_QUALIDADE: string;
  NO_UNIDADE_CAIXA: string;
}
