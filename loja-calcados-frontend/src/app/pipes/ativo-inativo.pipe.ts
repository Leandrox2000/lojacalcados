import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ativoInativo'
  })
export class AtivoInativoPipe implements PipeTransform{

    transform(value: boolean): string {
        return value ? 'Ativo' : 'Inativo';
      }
}