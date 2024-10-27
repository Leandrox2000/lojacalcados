import { FormGroup, FormControl, Validators, AbstractControl, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { MessageService } from "src/app/core/services/message.service";
import { Notificacao } from "src/app/model/notificacao";

export class ValidacaoForm {

  form: FormGroup;
  notificacoes: Notificacao[] = []
  constructor(public messageService:MessageService) {
  }

  async validateAllFormFields(formGroup: FormGroup) {
    this.notificacoes = []
    await this.validarTodosCampos(formGroup);
    return this.notificacoes.map(x => x.mensagem).join('<br>')
  }

  validarTodosCampos(abstractControl: AbstractControl): Promise<boolean> {
    return new Promise((resolve) => {
      Object.keys((abstractControl as FormGroup).controls).forEach((field) => {
        const control = abstractControl.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validarTodosCampos(control);
        } else if (control instanceof FormArray) {
          this.validarTodosCamposFormArray(control);
        }
      });
      this.trimForm(abstractControl);
      resolve(true)
    })
  }
  validarTodosCamposFormArray(formArray: FormArray) {
    formArray.controls.forEach((field, index) => {
      if (field.status == 'INVALID') {
        let notificacao = new Notificacao
        notificacao.mensagem = "A linha " + (index + 1) + " contém campo(s) inválido(s)"
        this.notificacoes.push(notificacao)
      }
      this.validarTodosCampos(field);
    });
  }

  trimForm(formGroup: AbstractControl) {
    Object.keys((formGroup as FormGroup).controls).forEach((key) => {
      if (formGroup.get(key).value) {
        if (typeof formGroup.get(key).value === "string") {
          formGroup.get(key).setValue(formGroup.get(key).value.replace(/( )+/g, " ").trim())
        }
      }
    });
  }

  retirarValidacaoControl(control: AbstractControl) {
    control.clearValidators();
    control.updateValueAndValidity();
  }
  retirarValidacao(campo: string) {
    this.form.get(campo).reset();
    this.form.get(campo).clearValidators();
    this.form.get(campo).updateValueAndValidity();
  }

  addValidacaoControl(control: AbstractControl) {
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return of(isValid ? null : { 'whitespace': true });
  }

  desabilitarCamposForm(abstractControl: AbstractControl): Promise<boolean> {
    return new Promise((resolve) => {
      Object.keys((abstractControl as FormGroup).controls).forEach((field) => {
        const control = abstractControl.get(field);
        if (control instanceof FormControl) {
          control.disable({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.desabilitarCamposForm(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(element => {
            this.desabilitarCamposForm(element);
          });
        }
      });
      resolve(true)
    })
  }

  async habilitarDesabilitarCamposComplexidadeSnap(campos: string[], item: AbstractControl, habilitar) {
    campos.forEach(campo => {
      if (habilitar) {
        this.addValidacaoControl(item.get(campo))
        item.get(campo).enable()
      } else {
        item.get(campo).reset()
        this.retirarValidacaoControl(item.get(campo))
        item.get(campo).disable({ onlySelf: true })
      }
    });
  }

  verificarNumberForm(control: AbstractControl) {
    return new Promise((resolve) => {
      let vrPcomp1Parametro = Number(control.value)
      if (isNaN(vrPcomp1Parametro)) {
        control.reset()
        control.setErrors({'incorrect': true})
        control.markAsTouched({ onlySelf: true });
        resolve(false)
      }
      resolve(true)
    })
  }
  validarValoresPermitidosString(control: AbstractControl, valoresPermitidos: string[], mensagem) {
    if (!control.value) return false
    if (!valoresPermitidos.includes(control.value.toUpperCase())) {
      this.messageService.enviarMensagemAlerta(mensagem)
      control.reset()
      control.setErrors({'incorrect': true})
      control.markAsTouched({ onlySelf: true });
      return false
    }
    return true
  }

  async validarCampoNumber(control, mensagem = 'Digite um valor válido') {
    return new Promise(async (resolve) => {
      if (!(await this.verificarNumberForm(control))) {
        this.messageService.enviarMensagemAlerta(mensagem)
        resolve(false)
      }
      resolve(true)
    })
  }

}
