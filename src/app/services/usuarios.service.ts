import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private headers: HttpHeaders;
  private base: string;
  constructor(private http: HttpClient, private admin: AdminService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  setInfoUser(user: boolean, infoUser) {
    if (user) {
      localStorage.setItem('usuarioLogged', JSON.stringify(infoUser));
    }
  }

  isSetUsuario(): boolean  {
    const user = JSON.parse(localStorage.getItem('usuarioLogged'));

    if (user !== undefined || user !== null) {
      return true;
    }

    return false;
  }

  getInfoUser() {
    return JSON.parse(localStorage.getItem('usuarioLogged'));
  }

  // este funcion deshabilita un usuario del sistema {id_usuario}
  disableUser(usuario) {
    return this.http.post(this.base + 'usuarios/disable.user.php', usuario, { headers: this.headers });
  }
}
