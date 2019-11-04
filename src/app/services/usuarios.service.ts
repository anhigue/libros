import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private headers: HttpHeaders;
  private base: string;
  constructor(private http: HttpClient, private admin: AdminService, private router: Router) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  // guarda en el local storage la informacion del usuario
  setInfoUser(user: boolean, infoUser) {
    if (user) {
      const usuario = {
        log: user,
        usuario: infoUser
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  // guarda la informacion de la subscripcion del usuario
  setSubscripcionUsuario(sub) {
    if (sub) {
      localStorage.setItem('subUsuario', JSON.stringify(sub));
    }
  }

  // verifica que un usuario ese en el local storage
  isSetUsuario(): boolean  {
    const user = JSON.parse(localStorage.getItem('usuario'));
    console.log(user);
    if (user === null) {
      return false;
    }

    return true;
  }

  // verifica que un usuario ese en el local storage
  isSetSubUsuario(): boolean  {
    const user = JSON.parse(localStorage.getItem('subUsuario'));
    if (user === null) {
      return false;
    }

    return true;
  }

  // me retorna la informacion de un usuario loggeado
  getInfoUser() {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  // me retorna el valor de la subscripcion de los usuarios
  getInfoSub() {
    return JSON.parse(localStorage.getItem('subUsuario'));
  }

  // elimina la información del usuario
  logoutUser() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('subUsuario');
    this.router.navigateByUrl('home');
  }

  // este funcion deshabilita un usuario del sistema {id_usuario}
  disableUser(usuario) {
    return this.http.post(this.base + 'usuarios/disable.user.php', usuario, { headers: this.headers });
  }
}
