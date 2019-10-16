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
    this.base = 'http://localhost/api-libros/routes/';
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

  // crear un nuevo usuario por medio de un procedimiento almacenado devolviendo un el id del usuario
  // {"nombre":"Hugo","apellido": "higueros","genero": 1,"correo": "hugo@twitter.com","pass": "hugo","tipo": 1}
  createUsuario(user) {
    return this.http.post(this.base + 'usuarios/registro.php', user, { headers: this.headers });
  }

  // reliza la autentificación del usuario {"correo":"hugo@twitter.com", "pass": "hugo"}
  loginUsuario(user) {
    return this.http.post(this.base + 'usuarios/login.php', user, { headers: this.headers });
  }

  // eliminar una sub categoria
  deleteSubCat(subcat) {
    return this.http.post(this.base + 'administracion/delete.sub.cat.php', subcat, { headers: this.headers });
  }

  // eliminar una categoria {"id_categoria": 4}
  deleteCat(cat) {
    return this.http.post(this.base + 'administracion/delete.cat.php', cat, { headers: this.headers });
  }

  // crear una categoria {"nombre": "Nueva Cat", "tipo": 1, "img":"google.com"}
  createCat(cat) {
    return this.http.post(this.base + 'administracion/create.cat.php', cat, { headers: this.headers });
  }

  // crear una sub categoria {"nombre": "Nueva Cat", "id_categoria": 1, "img":"google.com"}
  createSubCat(cat) {
    return this.http.post(this.base + 'administracion/create.sub.cat.php', cat, { headers: this.headers });
  }

  // obtener los cuatro articulos destacados
  getDestacados() {
    return this.http.get(this.base + 'articulos/get.destacado.php', { headers: this.headers });
  }

  // obtiene los articulos por offset y limite {"limit": 1, "offset": 0}
  getArticuloLO(rango) {
    return this.http.post(this.base + 'articulos/get.limit.offset.php', rango, { headers: this.headers });
  }

  // obtiene el numero de aritucolos
  getCountArticulo() {
    return this.http.get(this.base + 'articulos/get.count.php', { headers: this.headers });
  }

  // obtener la informacion de un solo articulo
  getArticulo(articulo) {
    return this.http.post(this.base + 'articulos/read.one.php', articulo, { headers: this.headers });
  }

  // obtiene un usuario a partir de su correo
  getUserId(correo) {
    return this.http.post(this.base + 'usuarios/readOne.php', correo, { headers: this.headers });
  }

  // actualiza la visita del articulo {"id_articulo": 1}
  updateVisita(id) {
    return this.http.post(this.base + 'articulos/visita.update.php', id, { headers: this.headers });
  }

  // obtiene solo las categorias
  getCategorias() {
    return this.http.get(this.base + 'administracion/read.categorias.php', { headers: this.headers });
  }

  // obtiene los tipos de categorias a mostrar
  getTipoCategorias() {
    return this.http.get(this.base + 'administracion/read.tipo.cat.php', { headers: this.headers });
  }
}
