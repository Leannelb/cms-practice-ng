import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AbstractModalComponent } from '../../../base-classes/abstract-modal-component';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent  extends AbstractModalComponent implements OnInit {
  public messages:string[];
  public title:string;
  public alertType:string;
  
  constructor(private modalService:ModalService) {
    super();
   
  }

  ngOnInit() {
    this.messages = [];
    this.title = "";
    this.alertType = 'information';

    this.modalService.showAlertModalSubject.subscribe((request)=>{
      this.messages = request.messages;
      this.title = request.title ? request.title : "Information";
      this.alertType = request.modalType  ? request.modalType :"information"   ;
      this.openModal();
    });
  }

  closeModal(){
    super.closeModal();
    this.messages = [];
    this.title = "";
    this.alertType = '';
  }

}

