import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private headers: HttpHeaders;
  private base: string;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  getComentarios(articulo) {
    return this.http.post(this.base + 'comentarios/read.php', articulo, { headers: this.headers });
  }

  createComentario(comentario) {
    return this.http.post(this.base + 'comentarios/create.php', comentario, { headers: this.headers });
  }

  createComentarioHijo(comentario) {
    return this.http.post(this.base + 'comentarios/create.hijo.php', comentario, { headers: this.headers });
  }

  getSubComentarios(padre) {
    return this.http.post(this.base + 'comentarios/read.sub.php', padre, { headers: this.headers });
  }

  report(comentario) {
    return this.http.post(this.base + 'comentarios/reportar.php', comentario, { headers: this.headers });
  }
}
