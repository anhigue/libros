import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private headers: HttpHeaders;
  private base: string;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/articulos/routes/';
  }

  getRol() {
    return this.http.get(this.base + 'administracion/read.tipo.usuario.php', { headers: this.headers });
  }

  getGenero() {
    return this.http.get(this.base + 'administracion/read.genero.php', { headers: this.headers });
  }

  getCategoriaSub() {
    return this.http.get(this.base + 'administracion/read.all.categoria.php', { headers: this.headers });
  }

  getUsuarios() {
    return this.http.get(this.base + 'administracion/read.datos.usuario.php', { headers: this.headers });
  }
}
