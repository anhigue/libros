import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

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

  // show permisos
  showModetion = false;
  showAdministracion = false;
  showSubscripcion = false;

  constructor(private admin: AdminService) {
    this.getUsuario();
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
}
