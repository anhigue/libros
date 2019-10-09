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

  // obtiene los roles del sistema
  getRol() {
    return this.http.get(this.base + 'administracion/read.tipo.usuario.php', { headers: this.headers });
  }

  // obtiene los generos para registro de un nuevo usuario
  getGenero() {
    return this.http.get(this.base + 'administracion/read.genero.php', { headers: this.headers });
  }

  // obtiene la lista de las categorias y subcategorias
  getCategoriaSub() {
    return this.http.get(this.base + 'administracion/read.all.categoria.php', { headers: this.headers });
  }

  // obtiene la lista de los usuarios
  getUsuarios() {
    return this.http.get(this.base + 'administracion/read.datos.usuario.php', { headers: this.headers });
  }

  // obtiene la lista de los estados que puede tener un articulo
  getEstados() {
    return this.http.get(this.base + 'administracion/read.estados.php', { headers: this.headers });
  }

  // crear un encabezado del articulo {"titulo": "Este es mi titulo","fk_id_estado": 1,"plantilla_articulo": 1}
  createArticulo(articulo: any) {
    return this.http.post(this.base + 'articulos/create.php', articulo, { headers: this.headers });
  }

  // crear los parrafos de un articulo { "parrafo":" este es el parrafo", "id_articulo": 1}
  crateParrafo(parrafo: any) {
    return this.http.post(this.base + 'articulos/create.parrafo.php', parrafo, { headers: this.headers });
  }

  // crear una imagen para el articulo { "id_articulo", "path"}
  createImagen(imagen: any) {
    return this.http.post(this.base + 'articulos/create.image.php', imagen, { headers: this.headers });
  }

  // crear un link para un articulo { "id_articulo": 3, "link": "www.google.com"}
  createLink(link: any) {
    return this.http.post(this.base + 'articulos/create.link.php', link, { headers: this.headers });
  }

  // eliminar un articulo { "id_articulo": 3}
  deleteArticulo(articulo: any) {
    return this.http.post(this.base + 'articulos/delete.php', articulo, { headers: this.headers });
  }

  // obtiene el ultimo articulo creado
  getMaxArticulo() {
    return this.http.get(this.base + 'articulos/get.max.php', { headers: this.headers });
  }

  // obtiene todos los articulos
  getAllArticulos() {
    return this.http.get(this.base + 'articulos/get.all.php', { headers: this.headers });
  }

  // crear una nueva subscripcion
  createSubscripcion(sub) {
    return this.http.post(this.base + 'usuarios/create.sub.php', sub, { headers: this.headers });
  }

  // Obtener todos los tipos de subscripcion
  getTipoSub() {
    return this.http.get(this.base + 'usuarios/get.tipo.php', { headers: this.headers });
  }
}
