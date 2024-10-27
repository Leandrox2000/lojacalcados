import { NgModule } from '@angular/core';
import { MatriculaFormControlDirective } from './matricula-form-control.directive';
import { MatriculaDirective } from './matricula.directive';
import { SortableDirective } from './sortable.directive';

import { UppercaseDirective } from './uppercase.directive';
@NgModule({
        declarations: [
                UppercaseDirective,
                SortableDirective,
                MatriculaFormControlDirective,
                MatriculaDirective  
        ],
        imports: [
        ],
        exports: [
                MatriculaDirective,  
                UppercaseDirective,
                SortableDirective,
                MatriculaFormControlDirective          
        ],

})
export class DirectivesModule { }
