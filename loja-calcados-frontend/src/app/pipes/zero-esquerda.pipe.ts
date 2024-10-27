import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'zeroEsquerda'
})

export class ZeroEsquerdaPipe implements PipeTransform {
    transform(value: any, args: any[]): string {
        if (value != null) {
            let str = value.toString();
            return str.padStart(args[0] ,"0");
        }
    }
}
