import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { Util } from '../../../util/util';

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

  constructor(private admin: AdminService, private route: Router) {
    this.getDestacados();
    this.limite = 5;
    this.offset = 0;
    this.util = new Util(this.admin);
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
    await this.admin.getDestacados().toPromise().then( res => {this.destacados = res; console.log(res); });
  }

  async getArticulos(rango) {
    await this.admin.getArticuloLO(rango).toPromise().then( res => {this.articulosShow = res; console.log(res); });
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
    await this.admin.updateVisita(id_).toPromise().then( res => {
      this.goTo(id);
    });
  }

}
