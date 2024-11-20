import { NgModule } from '@angular/core';

import { AtivoInativoPipe } from './ativo-inativo.pipe';
import { ZeroEsquerdaPipe } from './zero-esquerda.pipe';
import { TableFilterPipe } from './filtro-lista.pipe';
import { safeUrlPipe } from './safe-url.pipe';
import { ProcessoElementarPipe } from './processo-elementar.pipe';
import {DateFormatPipe} from "./date-format.pipe";
@NgModule({
        declarations: [
                AtivoInativoPipe,
                ZeroEsquerdaPipe,
                TableFilterPipe,
                safeUrlPipe,
                ProcessoElementarPipe,
                DateFormatPipe,
        ],
        imports: [
        ],
        exports: [
                AtivoInativoPipe,
                ZeroEsquerdaPipe,
                TableFilterPipe,
                safeUrlPipe,
                ProcessoElementarPipe,
                DateFormatPipe,
        ],

})
export class PipesModule { }
