import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'processoElementar'
})
export class ProcessoElementarPipe implements PipeTransform {
    transform(value: any): string {
        if (value != null) {
            let str = value.toString();
            return str;
        }
    }
}