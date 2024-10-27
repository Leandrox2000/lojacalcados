export interface HistoricalDataItem {
    nuHistorico: number;
    coIpOrigem: string;
    dhRequisicao: string;
    deCorpoRequisicao: string;
    dhResposta: string;
    deCorpoResposta: string;
    icSituacao: string;
    deMetodo: string;
    deEndpoint: string;
    cdResposta: any; 
    tpServico: string;
    coServico: any;
    coSituacaoResposta: any;
    coIdMsg: any;
    expanded?: boolean;
    requestHistory?: any[]; 
}

export interface ApiResponse {
    content: HistoricalDataItem[];
}