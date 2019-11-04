import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-foundation';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {

  title: string;
  message: string;
  options: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
