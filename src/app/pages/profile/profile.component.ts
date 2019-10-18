import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario: any;
  oneAtATime = true;
  usuarioInfo: any;
  tipoUsuario: any;
  tipoSubscripcion: any;

  mySubscripcion: any;

  // show permisos
  showModetion = false;
  showAdministracion = false;
  showSubscripcion = false;

  modalRef: BsModalRef;

  subscriocionCreate: any;

  constructor(private admin: AdminService, private modalService: BsModalService) {
    this.getUsuario();
    this.getTipoSub();
    this.getSub();
    this.mySubscripcion = JSON.parse(localStorage.getItem('sub'));
  }

  ngOnInit() {

  }

  getUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.getInfoUser();
  }

  async getInfoUser() {
    const usuario = {
      id: this.usuario.id_usuario
    };
    await this.admin.getViewUsuario(usuario).toPromise().then( async (res: any) => {
      this.usuarioInfo = res;
      await this.admin.getRol().toPromise().then( async (rest: object[]) => {
        this.tipoUsuario = await rest.filter( (value: any) => this.usuarioInfo.id_tipo === value.id_tipo_usuario)[0];
        console.log(this.tipoUsuario);
        this.showAdmin(this.tipoUsuario.tipo_usuario);
        this.showModeracion(this.tipoUsuario.tipo_usuario);
        this.showSub(this.tipoUsuario.tipo_usuario);
      });
      console.log(this.usuarioInfo);
    });
  }

  showModeracion(tipoUsuario) {
    if ( tipoUsuario !== 'moderador') {
      this.showModetion = false;
    } else {
      this.showModetion = true;
    }

    console.log(this.showModetion, 'moderation');
  }

  showAdmin(tipoUsuario) {
    if ( tipoUsuario !== 'administrador') {
      this.showAdministracion = false;
    } else {
      this.showAdministracion = true;
    }
    console.log(this.showModetion, 'administrador');
  }

  showSub(tipoUsuario) {
    if ( tipoUsuario !== 'autor') {
      this.showAdministracion = false;
    } else {
      this.showAdministracion = true;
    }
    console.log(this.showModetion, 'autor');
  }

  async getTipoSub() {
    await this.admin.getTiposSubscripcion().toPromise().then( res => this.tipoSubscripcion = res);
  }

  openModal(template: TemplateRef<any>, sub: any) {
    this.modalRef = this.modalService.show(template, {class: 'small'});
    this.subscriocionCreate = sub;
    console.log(sub);
  }

  psc() {
    const sub = {
      id_tipo_sub: this.subscriocionCreate.id_tipo_sub,
      id_subscripcion: JSON.parse(localStorage.getItem('sub')).id_subscripcion
    };

    console.log(sub);
    this.admin.updateSub(sub).toPromise().then( res => {
      console.log(res);
      this.getSub();
      this.mySubscripcion = JSON.parse(localStorage.getItem('sub'));
      location.reload();
      this.modalRef.hide();
    });
  }

  async getSub() {
    const user = {
      id: JSON.parse(localStorage.getItem('usuario')).id_usuario
    };
    await this.admin.getMySubscripcion(user).toPromise().then(res => {
      if (res) {
        localStorage.setItem('sub', JSON.stringify(res));
      }
    });
  }

}
