import { Injectable } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Injectable({
    providedIn: 'root'
  })

  export class ModalService {

    constructor(private modalService: NgbModal) { }

    abrirModal(content){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    fecharModal(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    fecharTudo(){
        this.modalService.dismissAll();
    }


    /*openModal(content): string {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            return 'Closed with: ${result}';
        },(reason) => {
            return  'Dismissed ${this.getDismissReason(reason)}';
        });
        return '';
    }*/

  }