import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModeracionService } from '../../services/moderacion.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { AdminService } from '../../services/admin.service';
import { UsuariosService } from '../../services/usuarios.service';

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

  usuario: any;

  constructor(private mod: ModeracionService, private modalService: BsModalService,
              private admin: AdminService, private user: UsuariosService) { }

  ngOnInit() {
    this.getModeracion();
    if (this.user.isSetUsuario()) {
      this.usuario = this.user.getInfoUser();
      console.log(this.usuario);
    }
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
    .then( async (response: any) => {
      this.titleAlert = 'Publicación de articulo';
      this.messageAlert = response.message;
      this.getModeracion();
      this.dismissAlert();
      await this.mod.logUsuario({id_usuario: this.usuario.usuario.id_usuario}).toPromise()
      .then( respon => console.log(respon))
      .catch( error => console.log(error));
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
