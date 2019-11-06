import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModeracionService {
  private headers: HttpHeaders;
  private base: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  // esta funcion obtiene la moderacion de los articulos
  getModeracion() {
    return this.http.get(this.base + 'moderacion/read.php', { headers: this.headers });
  }

  // esta funcion publica un articulo a la lista
  publishidArticulo(articulo) {
    return this.http.post(this.base + 'moderacion/publicar.php', articulo, { headers: this.headers });
  }

  // esta funcion registra la actividad del usuario al moderar en una fecha
  logUsuario(usuario) {
    return this.http.post(this.base + 'moderacion/log.php', usuario, { headers: this.headers });
  }

  // esta funcion obtiene los comentarios para ser moderados
  getComentariosModeracion() {
    return this.http.get(this.base + 'moderacion/read.coment.php', { headers: this.headers });
  }

  publishidComentario(moderador) {
    return this.http.post(this.base + 'moderacion/publicar.coment.php', moderador, { headers: this.headers });
  }
}
