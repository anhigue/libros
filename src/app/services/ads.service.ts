import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private headers: HttpHeaders;
  private base: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.base = 'http://localhost/api-libros/routes/';
  }

  // crea una nueva publicidad dentro del sistema {nombre, img}
  create(ads) {
    return this.http.post(this.base + 'ads/create.php', ads, { headers: this.headers });
  }

  // actualiza al informacion de la publicidad {id_ad, nombre, img}
  update(ads) {
    return this.http.post(this.base + 'ads/update.php', ads, { headers: this.headers });
  }

  // elimina una publicidad en especifico { id_ad }
  delete(ads) {
    return this.http.post(this.base + 'ads/delete.php', ads, { headers: this.headers });
  }

  // obtiene toda la publicidad del sistema
  getAll() {
    return this.http.get(this.base + 'ads/get.php', { headers: this.headers });
  }

  // actualizar el numero de clicks {id_ad}
  updateVisita(ads) {
    return this.http.post(this.base + 'ads/vista.php', ads, { headers: this.headers });
  }
}
