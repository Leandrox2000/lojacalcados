import { ListaMassaComponent } from "./core/components/listaMassa/listaMassa.component";
import {
  APP_INITIALIZER,
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import localePt from "@angular/common/locales/pt";
import { AppComponent } from "src/app/app.component";
import { appRoutes, AppRoutingModule } from "src/app/app-routing.module";
import { RouterModule } from "@angular/router";
import {
  KeycloakAngularModule,
  KeycloakService,
  KeycloakBearerInterceptor,
} from "keycloak-angular";
import { environment } from "../environments/environment";
import { registerLocaleData } from "@angular/common";
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from "ngx-ui-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { PipesModule } from "./pipes/pipes.module";
import { DirectivesModule } from "./directives/directives.module";
import { NgxMaskModule } from "ngx-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CaixaDialogoComponent } from "./modules/caixa-dialogo/caixa-dialogo.component";
import { ApiInteractionComponent } from "./modules/api-interaction/api-interaction.component";
import { ConsultaHistoricoComponent } from "./modules/consulta-historico/consulta-historico.component";
import { ConfiguracaoComponent } from "src/app/core/components/configuracao/configuracao.component";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { DeCorpoRespostaDialogComponent } from "./components/de-corpo-resposta-dialog/de-corpo-resposta-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { DeCorpoReqDialogComponent } from "./components/de-corpo-req-dialog/de-corpo-req-dialog.component";
import { EndToEndIdHistoryDialogComponent } from "./components/end-to-end-id-history-dialog/end-to-end-id-history-dialog.component";
import { MensagensRecebidasModule } from "./modules/mensagens-recebidas/mensagens-recebidas.module";
import { CommonModule } from "@angular/common";
import { GeraMassaComponent } from "./core/components/gera-massa/gera-massa.component";
import { ListaUsuariosComponent } from "./core/components/lista-usuarios/lista-usuarios.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkTreeModule } from "@angular/cdk/tree";
import { PortalModule } from "@angular/cdk/portal";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DATE_LOCALE, MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTreeModule } from "@angular/material/tree";
import { MatBadgeModule } from "@angular/material/badge";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { ResultGeraMassaComponent } from "./core/components/result-gera-massa/result-gera-massa.component";
import { MY_FORMATS } from "./modules/util/MY_FORMATS";
import { ListaSolicitacoesComponent } from './core/components/lista-solicitacoes/lista-solicitacoes.component';
import { MatPaginatorIntlCustom } from "./modules/util/matPaginatorIntlCustom";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DetalheSolicitacaoComponent } from './core/components/detalhe-solicitacao/detalhe-solicitacao.component';
import { GeraMassa9Component } from './core/components/gera-massa9/gera-massa9.component';
import { ListaServicosDadosComponent } from './core/components/lista-servicos-dados/lista-servicos-dados.component';
import { ManterServicoDadosComponent } from './core/components/manter-servico-dados/manter-servico-dados.component';
import { ListarLogComponent } from './core/components/listar-log/listar-log.component';

registerLocaleData(localePt, "pt");

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  logoSize: 100,
  logoUrl: "/assets/images/lgcx100.png",
  blur: 12,
  text: "Aguarde...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
};

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: environment.ssoUri,
        realm: "intranet",
        clientId: "cli-web-mpf",
      },
      initOptions: {
        //onLoad: 'login-required',
        checkLoginIframe: false,
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    appRoutes,
    ApiInteractionComponent,
    CaixaDialogoComponent,
    ConsultaHistoricoComponent,
    ConfiguracaoComponent,
    ListaMassaComponent,
    MensagensRecebidasModule,
    DeCorpoRespostaDialogComponent,
    DeCorpoReqDialogComponent,
    EndToEndIdHistoryDialogComponent,
    GeraMassaComponent,
    ListaUsuariosComponent,
    ResultGeraMassaComponent,
    ListaSolicitacoesComponent,
    DetalheSolicitacaoComponent,
    GeraMassa9Component,
    ListaServicosDadosComponent,
    ManterServicoDadosComponent,
    ListarLogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    PipesModule,
    DirectivesModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OverlayModule,
    PortalModule,
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setOpts('pt-BR', 'pt')
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MatPaginatorIntl, useValue: new MatPaginatorIntlCustom() }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
