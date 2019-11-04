import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { UsuariosService } from '../../services/usuarios.service';

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

  constructor(private admin: AdminService, private modalService: BsModalService, private users: UsuariosService) {
  }

  async ngOnInit() {
    await this.getUsuario();
    await this.getTipoSub();
  }

  async getUsuario() {
    this.usuario = await this.users.getInfoUser();
    if (!this.users.isSetSubUsuario()) {
      await this.admin.getMySubscripcion({ id: this.usuario.usuario.id_usuario }).toPromise().then(res => {
        if (res) {
          this.users.setSubscripcionUsuario(res);
        }
      });
    } else {
      this.mySubscripcion = this.users.getInfoSub();
      console.log(this.mySubscripcion);
    }

    if (this.usuario.usuario.tipo_usuario === 'administrador') {
      this.showAdministracion = true;
    }
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
      this.mySubscripcion = JSON.parse(localStorage.getItem('sub'));
      location.reload();
      this.modalRef.hide();
    });
  }

  async out() {
    await this.users.logoutUser();
  }
}
