import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import localePt from "@angular/common/locales/pt";
import { AppComponent } from "src/app/app.component";
import { appRoutes, AppRoutingModule } from "src/app/app-routing.module";
import { RouterModule } from "@angular/router";
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
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { PipesModule } from "./pipes/pipes.module";
import { DirectivesModule } from "./directives/directives.module";
import { NgxMaskModule } from "ngx-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkTreeModule } from "@angular/cdk/tree";
import { PortalModule } from "@angular/cdk/portal";
import { HomeComponent } from "./modules/home/home.component";
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from "./core/footer/footer.component";
import { ProdutosComponent } from './core/components/produtos/produtos.component';
import { SobreComponent } from './core/components/sobre/sobre.component';
import { ContatoComponent } from './core/components/contato/contato.component';
import { ContaComponent } from './core/components/conta/conta.component';
import { DetalheProdutoComponent } from './core/components/detalhe-produto/detalhe-produto.component';
import { CarrinhoComponent } from './core/components/carrinho/carrinho.component';
import { PagamentoComponent } from './core/components/pagamento/pagamento.component';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    appRoutes,
    HomeComponent,
    FooterComponent,
    ProdutosComponent,
    SobreComponent,
    ContatoComponent,
    ContaComponent,
    DetalheProdutoComponent,
    CarrinhoComponent,
    PagamentoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: "", component: HomeComponent }]),
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    PipesModule,
    DirectivesModule,
    CommonModule,
    CdkTreeModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
