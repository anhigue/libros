import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

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

  constructor(private admin: AdminService) {
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
}
