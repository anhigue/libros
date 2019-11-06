import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModeracionService } from '../../services/moderacion.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.scss']
})
export class ModerationComponent implements OnInit {

  moderacionArticulo: any;
  modalRef: BsModalRef;
  articuloToPublished: any;
  articuloShow: any = [];

  showAlert = false;
  titleAlert: string;
  messageAlert: string;

  constructor(private mod: ModeracionService, private modalService: BsModalService,
              private admin: AdminService) { }

  ngOnInit() {
    this.getModeracion();
  }

  async getModeracion() {
    await this.mod.getModeracion().toPromise()
    .then( response => {
      if (response) {
        this.moderacionArticulo = response;
      }
    })
    .catch( error => console.log(error));
  }

  async openModal(template: TemplateRef<any>, articulo?: any) {
    this.modalRef = this.modalService.show(template, {class: 'full'});
    if (articulo) {
      this.articuloToPublished = articulo;
      console.log(articulo);
      await this.admin.getArticulo({
        id_articulo: this.articuloToPublished.id_articulo,
      fk_id_articulo: this.articuloToPublished.id_articulo
      }).toPromise().then( response => {
        if (response) {
          this.articuloShow = response;
          console.log(this.articuloShow);
        }
      })
      .catch( error => console.log(error));
    }
  }

  async publishedArticulo(item) {
    await this.mod.publishidArticulo({
      id_articulo: item.id_articulo
    }).toPromise()
    .then( (response: any) => {
      this.titleAlert = 'Publicación de articulo';
      this.messageAlert = response.message;
      this.getModeracion();
      this.dismissAlert();
    })
    .catch( error => console.log(error));
  }

  dismissAlert() {
    if (this.showAlert) {
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }
}
