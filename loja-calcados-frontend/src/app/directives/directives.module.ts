import { NgModule } from '@angular/core';
import { SortableDirective } from './sortable.directive';

import { UppercaseDirective } from './uppercase.directive';
@NgModule({
        declarations: [
                UppercaseDirective,
                SortableDirective,
        ],
        imports: [
        ],
        exports: [
                UppercaseDirective,
                SortableDirective
        ],

})
export class DirectivesModule { }
