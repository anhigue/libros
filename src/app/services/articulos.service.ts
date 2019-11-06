import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private headers: HttpHeaders;
  private base: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  // este funcion me permite actualizar el encabezado y la plantilla de un articulo
  updateArticulo(articulo) {
    return this.http.post(this.base + 'articulos/update.php', articulo, { headers: this.headers });
  }

  // esta funcion me permite actualiar el parrafo de un articulo
  updateArticuloParrafo(articulo) {
    return this.http.post(this.base + 'articulos/update.parrafos.php', articulo, { headers: this.headers });
  }

  // esta funcion me permite actualizar las imagenes de un articulo
  updateArticuloImagen(articulo) {
    return this.http.post(this.base + 'articulos/update.imagenes.php', articulo, { headers: this.headers });
  }
}
