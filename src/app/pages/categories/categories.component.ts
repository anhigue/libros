import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Router } from '@angular/router';

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

  // para obtener los articulos de la busqueda
  articulosSearch: any;
  constructor(private admin: AdminService, private filterPipe: FilterPipe, private route: Router) {
    this.getPlantilla();
    this.getCategoria();
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
}
