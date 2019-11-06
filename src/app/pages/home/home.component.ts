import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { Util } from '../../../util/util';
import { AdsService } from '../../services/ads.service';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destacados: any;
  articulosShow: any;
  limite: number;
  offset: number;
  listado: any;
  showNmber: number;
  page: number;
  util: Util;

  // publicidad de la pagina
  adsObject = [];

  constructor(private admin: AdminService, private route: Router, private ads: AdsService,
              private art: ArticulosService) {
    this.getDestacados();
    this.limite = 5;
    this.offset = 0;
    this.util = new Util(this.admin);
    this. getAllAds();
  }

  ngOnInit() {
    const rango = {
      limit: this.limite,
      offset: this.offset
    };

    this.getArticulos(rango);
    this.getCount();
  }

  async getDestacados() {
    await this.art.getDestacados().toPromise().then( res => {this.destacados = res; });
  }

  async getArticulos(rango) {
    await this.art.getLO(rango).toPromise().then( res => {this.articulosShow = res; });
  }

  async getCount() {
    await this.admin.getCountArticulo().toPromise().then( (res: number) => {
      this.listado = res;
      let i = 0;
      for (let index = 0; index < this.listado; index++) {
        if ((this.listado % 5 ) === 0) {
          i += 1;
        }
      }

      if (i < 5 ) {
        this.showNmber = 1;
      } else {
        this.showNmber = i;
      }
    });
  }

  changePage() {
    this.limite += this.limite;
    this.offset += 5;

    const rango = {
      limit: this.limite,
      offset: this.offset
    };

    this.getArticulos(rango);
  }

  pageChanged(event: any): void {
    this.page = event.page;
  }

  goTo(id: any) {
    this.route.navigateByUrl('article/' + id.id_articulo);
  }

  async updateVista(id) {
    // tslint:disable-next-line:variable-name
    const id_ = {id_articulo: id.id_articulo};
    await this.art.updateVisitas(id_).toPromise().then( (rest) => {
      this.goTo(id);
    });
  }

  async getAllAds() {
    await this.ads.getAll().toPromise().then( (response: object[]) => {
      if (response) {
        for (let i = 0; i < 2; i++) {
          this.adsObject.push(response[Math.floor(Math.random() * response.length)]);
        }
        console.log(this.adsObject);
      }
    }).catch( error => console.log(error));
  }

  async updateVisitas(item) {
    const data = {
      id_ad: item.id_publicidad
    };

    await this.ads.updateVisita(data).toPromise().then( response => {
      if (response) {
        console.log(response);
      }
    }).catch( error => console.log(error));
  }
}
