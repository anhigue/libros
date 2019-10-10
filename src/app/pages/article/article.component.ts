import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  id_articulo: any;
  articulo: any;
  tipo: any;
  plantillaA;
  plantillaB;
  plantillaC;

  constructor(private admin: AdminService, private param: ActivatedRoute) {}

  ngOnInit() {
    this.id_articulo = this.param.snapshot.paramMap.get('id');
    this.getArticulo({
      id_articulo: this.id_articulo,
      fk_id_articulo: this.id_articulo
    });

  }

  async getArticulo(art) {
    await this.admin.getArticulo(art).toPromise().then( res => {
      this.articulo = res;
      console.log(this.articulo);
      this.tipo = this.articulo.articulo[0].plantilla_articulo;
      this.plantillaA = this.showPlantillaA(this.tipo);
      this.plantillaB = this.showPlantillaB(this.tipo);
      this.plantillaC = this.showPlantillaC(this.tipo);
    });
  }

  showPlantillaA(tipo: number) {
    if ( this.tipo * 1 === 1 ) {
      return true;
    }

    return false;
  }

  showPlantillaB(tipo: number) {
    if ( this.tipo * 1 === 2 ) {
      return true;
    }

    return false;
  }

  showPlantillaC(tipo: number) {
    if ( this.tipo * 1 === 3 ) {
      return true;
    }

    return false;
  }
}
