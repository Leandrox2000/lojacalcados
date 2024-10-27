
import { Directive, ElementRef, forwardRef, HostListener, Renderer2, StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatriculaDirective),
  multi: true
};

@Directive({
  selector: '[matriculaNgModel]',
  providers: [CUSTOM_INPUT_DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class MatriculaDirective implements ControlValueAccessor {
  private onChange: (val: any) => void;
  private onTouched: () => void;
  private value: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @HostListener('input', ['$event.target.value'])
  onInputChange(event: any) {
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
    this.updateTextInput(value, true)
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  private updateTextInput(value: any, propagateChange: boolean) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    if (propagateChange) {
      this.onChange(value);
    }
    this.value = value;
  }

  // ControlValueAccessor Interface
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: any): void {
    value = value ? value : null;
    this.updateTextInput(value, false);
  }
}

function filterValue(value): Number {
  let retorno: Number = Number(value.replace(/[^0-9]*/g, ''));
  return retorno == 0 ? null : retorno;
}