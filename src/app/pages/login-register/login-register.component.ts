import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-foundation';
import $ from 'jquery';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  modalRef: BsModalRef;
  generos: any;
  roles: any;
  showAlert: boolean;
  showAlertB: boolean;

  // variables para hacer el logeo
  correoLog: string;
  passLog: string;

  // variables para poder crear un nuevo usuario
  nombre: string;
  apellido: string;
  correo: string;
  pass: string;
  tipo: number;
  genero: number;

  // variable del usuario para retornar el id
  idUsuario: any;

  // usuario
  usuario: any;

  constructor(private modalService: BsModalService, private admin: AdminService, private route: Router) {
    this.getGeneros();
    this.getTipos();
    this.showAlert = false;
    this.showAlertB = false;
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'small'});
  }

  async getGeneros() {
    await this.admin.getGenero().toPromise().then( res => this.generos = res);
  }

  async getTipos() {
    await this.admin.getRol().toPromise().then( (res: object[]) => {
      this.roles = res.filter( (rest: any) => rest.tipo_usuario === 'creador');
    });
  }

  async login() {
    const usuario = {
      correo: this.correoLog,
      pass:  this.passLog
    };

    if (usuario.correo === undefined || usuario.pass === undefined) {
      this.showAlert = true;
    } else {
      await this.admin.loginUsuario(usuario).toPromise().then( async (res: any) => {
        // checkeo
        if (res.log * 1 === 0) {
          console.log(res);
          this.showAlert = true;
        } else {
          this.showAlert = false;
          const correo = {
            correo: this.correoLog
          };
          await this.admin.getUserId(correo).toPromise().then(
            rest => {
              this.usuario = rest;
              localStorage.setItem('usuario', JSON.stringify(this.usuario));
              this.route.navigateByUrl('profile/' + this.usuario.id_usuario);
            }
          );
        }
      });
    }
  }

  donShow() {
    this.showAlert = false;
    this.showAlertB = false;
  }

  reg() {

    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      genero: this.genero,
      correo: this.correo,
      pass: this.pass,
      tipo: this.tipo
    };

    if ( usuario.nombre === undefined ||
      usuario.apellido === undefined ||
      usuario.genero === undefined ||
      usuario.pass === undefined ||
      usuario.correo === undefined ||
      usuario.tipo === undefined ) {
        console.log('Error');
      } else {
        console.log(usuario);
        this.admin.createUsuario(usuario).toPromise().then( (res: any) => {
          this.idUsuario = res;
          this.showAlertB = true;
          this.modalRef.hide();
        });
    }
  }
}
