import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Router } from '@angular/router';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  plantillaA;
  plantillaB;

  plantilla;

  categorias;

  // para realizar el filtrado
  userFilter: any = { nombre_cat: '' };
  userFilter2: any = { nombre_sub: '' };
  userFilter3: any = { tipo_sub: '' };

  // publicidad de la pagina
  adsObject = [];

  // para obtener los articulos de la busqueda
  articulosSearch: any;
  constructor(private admin: AdminService, private filterPipe: FilterPipe, private route: Router, private ads: AdsService) {
    this.getPlantilla();
    this.getCategoria();
    this.getAllAds();
  }

  ngOnInit() {
  }

  async getPlantilla() {
    this.admin.getPlantillaCategoria().toPromise().then( (res: any) => {
      if ( res ) {
        this.plantilla = res;
        if (res.plantilla * 1 === 1) {
          this.plantillaA = true;
          this.plantillaB = false;
        } else if (res.plantilla * 1 === 2) {
          this.plantillaA = false;
          this.plantillaB = true;
        }
      }
    });
  }

  async getCategoria() {
    await this.admin.getCategoriasView().toPromise().then( (res: object[]) => {
      this.categorias = res;
    });
  }

  async serchBySubCat(categoria) {
    await this.admin.getByDinamicQuery({id_sub_categoria: categoria.id_sub}).toPromise()
    .then( response => {this.articulosSearch = response; console.log(this.articulosSearch);})
    .catch( error => console.log(error));
  }

  async updateVista(id) {
    // tslint:disable-next-line:variable-name
    const id_ = {id_articulo: id.id_articulo};
    await this.admin.updateVisita(id_).toPromise().then( res => {
      this.goTo(id);
    });
  }

  goTo(id: any) {
    this.route.navigateByUrl('article/' + id.id_articulo);
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
