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
    this.admin.getViewUsuario(usuario).toPromise().then(res => {
      this.usuarioInfo = res;
      console.log(this.usuarioInfo);
    });
  }
}
