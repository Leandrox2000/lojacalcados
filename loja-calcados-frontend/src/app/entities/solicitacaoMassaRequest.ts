import { AtributosRequest } from "./atributosRequest";

export interface SolicitacaoMassaRequest {
  idUsuarioSolicitante: number;
  idServico: number;
  idTipoMassa: number;
  qtdRegistroSolicitacao: number;
  atributos: AtributosRequest[];
  idAmbiente: number[];
  idUsuario: number[];
  noDemandaUtzcoMassaDado: string;
}
