import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
   name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

   transform(list: any[], value: string, atributos:[]) {
      return value ? list.filter( s => this.matches(s, value, atributos)) : list;
   }

  matches(obj: any, texto: string, atributos:[]) {
    let retorno: boolean
    for (let atributo of atributos) {
        let str = atributo  as keyof typeof obj;
        retorno = obj[str].toString().toLowerCase().includes(texto.toString().toLowerCase())      
        if(retorno) break;
    };
    return retorno
  }

}