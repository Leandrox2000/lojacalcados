import { Directive, ElementRef, HostListener, } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[matriculaFormControl]',
})
export class MatriculaFormControlDirective {
  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])  
  onInputChange(event) {
    const initalValue = event;
    let value = null;
    if (initalValue) {
      if (initalValue.toString().length > 1){
        value = initalValue.toString().toUpperCase().replace(/[^0-9]*/g, '')
      }else{
        value = initalValue.toString().toUpperCase().replace(/[^C|F[0-9]*/g, '')
      }
      if (value == '') {
        value = null;
      }else if ( initalValue.toString().toUpperCase().includes('C') && !value.toUpperCase().includes('C')){
      value = "C" + value
      }else if ( initalValue.toString().toUpperCase().includes('F') && !value.toUpperCase().includes('F')){
        value = "F" + value
      }else if(!initalValue.toString().toUpperCase().includes('C') && !initalValue.toString().toUpperCase().includes('F')){
        value = null
      }
    }
    if (initalValue !== value) {
      this.ngControl.valueAccessor.writeValue(value);
      this.ngControl.control.setValue(value);
    }
  }

}