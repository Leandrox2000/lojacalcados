import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements AfterViewInit {

  @ViewChild('sinopMenu')
  sinopMenu: ElementRef;

  securedRoutes = [];

  ngAfterViewInit(): void {
    this.higienizarMenu();
  }

  public logout(): void {
    console.log("logout");
  }

  // Esta função navega pelo menu recursivamente para ocultar os itens vazios, dinamicamente definidos por regras de acesso por perfil.
  private higienizarMenu(el = this.sinopMenu.nativeElement): boolean {
    let limpar = true;

    if (el.hasChildNodes()) {
      if (el.tagName === 'LI') {
        for (const filho of el.childNodes) {
          if (filho.tagName === 'UL') {
            limpar = !this.higienizarMenu(filho) ? false : limpar;
          } else if (filho.tagName === 'A' && filho.href) {
            limpar = false;
          }
        }
      }

      if (el.tagName === 'UL') {
        for (const filho of el.childNodes) {
          if (filho.tagName === 'LI') {
            limpar = !this.higienizarMenu(filho) ? false : limpar;
          }
        }
      }
    }

    if (limpar) {
      el.classList.add('invisivel');
    }

    return limpar;
  }
}