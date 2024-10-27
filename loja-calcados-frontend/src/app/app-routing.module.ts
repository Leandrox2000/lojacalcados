import { DetalheSolicitacaoComponent } from "./core/components/detalhe-solicitacao/detalhe-solicitacao.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "src/app/modules/home/home.component";
import { HeaderComponent } from "src/app/core/components/header/header.component";
import { NavMenuComponent } from "src/app/core/components/nav-menu/nav-menu.component";
import { ConsultaHistoricoComponent } from "src/app/modules/consulta-historico/consulta-historico.component";
import { ApiInteractionComponent } from "src/app/modules/api-interaction/api-interaction.component";
import { ConfiguracaoComponent } from "src/app/core/components/configuracao/configuracao.component";
import { MensagensRecebidasModule } from "./modules/mensagens-recebidas/mensagens-recebidas.module";
import { ListaMassaComponent } from "./core/components/listaMassa/listaMassa.component";
import { GeraMassaComponent } from "./core/components/gera-massa/gera-massa.component";
import { ListaUsuariosComponent } from "./core/components/lista-usuarios/lista-usuarios.component";
import { ResultGeraMassaComponent } from "./core/components/result-gera-massa/result-gera-massa.component";
import { ListaSolicitacoesComponent } from "./core/components/lista-solicitacoes/lista-solicitacoes.component";
import { GeraMassa9Component } from "./core/components/gera-massa9/gera-massa9.component";
import { ListaServicosDadosComponent } from "./core/components/lista-servicos-dados/lista-servicos-dados.component";
import { ManterServicoDadosComponent } from './core/components/manter-servico-dados/manter-servico-dados.component';
import { ListarLogComponent } from "./core/components/listar-log/listar-log.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/listar-massa",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "consulta-historico",
    component: ConsultaHistoricoComponent,
  },
  {
    path: "api-interaction",
    component: ApiInteractionComponent,
  },
  {
    path: "listar-log",
    component: ListarLogComponent,
  },
  {
    path: "configuracao",
    component: ConfiguracaoComponent,
  },
  {
    path: "mensagens-recebidas",
    component: MensagensRecebidasModule,
  },
  {
    path: "listar-massa",
    component: ListaMassaComponent,
  },
  {
    path: "gera-massa1",
    component: GeraMassaComponent,
  },
  {
    path: "gera-massa1/:idServico/:ambientes",
    component: GeraMassaComponent,
  },
  {
    path: "gera-massa9",
    component: GeraMassa9Component,
  },
  {
    path: "gera-massa9/:idServico/:ambientes",
    component: GeraMassa9Component,
  },
  {
    path: "listar-usuarios",
    component: ListaUsuariosComponent,
  },
  {
    path: "result-gera-massa/:idSolicitacao",
    component: ResultGeraMassaComponent,
  },
  {
    path: "listar-solicitacoes",
    component: ListaSolicitacoesComponent,
  },
  {
    path: "detalhe-solicitacao/:idSolicitacao",
    component: DetalheSolicitacaoComponent,
  },
  {
    path: "listar-servicos-dados",
    component: ListaServicosDadosComponent,
  },
  {
    path: "manter-servicos-dados/:idServico",
    component: ManterServicoDadosComponent,
  },
  {
    path: "manter-servicos-dados",
    component: ManterServicoDadosComponent,
  },
  {
    path: "manter-servicos-dados/:idServico/:disabled",
    component: ManterServicoDadosComponent,
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const appRoutes = [HomeComponent, HeaderComponent, NavMenuComponent];
