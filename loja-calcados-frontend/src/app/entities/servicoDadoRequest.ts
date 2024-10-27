import { AtributoServicoRequest } from "./atributoServicoRequest";
import { InterfaceServicoDadosRequest } from "./interfaceServicoDadosRequest";

export interface ServicoDadosRequest {
  idServicoDado: number;
  nomeServicoDado: string;
  descricaoServicoDado: string;
  status: string;
  nomeAreaNegocio: string;
  automatizado: string;
  ordemApresentacao: number;
  limiteRegistroMassa: number;
  limiteAcessoMassa: number;
  ambientes: number[];
  tiposCadastramento: number[];
  interfaces:InterfaceServicoDadosRequest[];
  atributoServicos: AtributoServicoRequest[];
}
