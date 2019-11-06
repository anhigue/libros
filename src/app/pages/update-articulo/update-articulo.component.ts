import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-update-articulo',
  templateUrl: './update-articulo.component.html',
  styleUrls: ['./update-articulo.component.scss']
})
export class UpdateArticuloComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  id_articulo: any;
  articulo: any;
  tipo: any;

  // show alert message
  showAlertMessage = false;
  titleAlert: string;
  messageAlert: string;

  constructor(private admin: AdminService, private param: ActivatedRoute, private art: ArticulosService) { }

  async ngOnInit() {
    this.id_articulo = await this.param.snapshot.paramMap.get('id');
    await this.getArticulo({
      id_articulo: this.id_articulo,
      fk_id_articulo: this.id_articulo
    });
  }

  async getArticulo(art) {
    await this.admin.getArticulo(art).toPromise().then( res => {
      this.articulo = res;
      console.log(this.articulo);
      this.tipo = this.articulo.articulo[0].plantilla_articulo;
    });
  }

  updateEncabezado() {
    this.articulo.articulo.forEach( async (element: any) => {
      const encabezado = {
        titulo_articulo: element.titulo_articulo,
        plantilla_articulo: element.plantilla_articulo,
        id_articulo: element.id_articulo
      };

      await this.art.updateArticulo(encabezado).toPromise()
      .then( (response: any) => {
        if (response) {
          this.titleAlert = 'Editar encabezado';
          this.messageAlert = response.message;
          this.dismissAlert();
        }
      })
      .catch(error => console.log(error));
    });
  }

  updateParrafos() {
    this.articulo.parrafos.forEach( async (element: any) => {
      const encabezado = {
        parrafo_articulo: element.parrafo_articulo,
        id_articulo_parrafo: element.id_articulo_parrafo
      };

      await this.art.updateArticuloParrafo(encabezado).toPromise()
      .then( (response: any) => {
        if (response) {
          this.titleAlert = 'Editar parrafos';
          this.messageAlert = response.message;
          this.dismissAlert();
        }
      })
      .catch(error => console.log(error));
    });
  }

  updateImagenes() {
    this.articulo.imagenes.forEach( async (element: any) => {
      const encabezado = {
        path: element.path,
        id_articulo_imagen: element.id_articulo_imagen
      };

      await this.art.updateArticuloImagen(encabezado).toPromise()
      .then( (response: any) => {
        if (response) {
          this.titleAlert = 'Editar Imagen';
          this.messageAlert = response.message;
          this.dismissAlert();
        }
      })
      .catch(error => console.log(error));
    });
  }

  dismissAlert() {
    if (this.showAlertMessage) {
      this.showAlertMessage = false;
    } else {
      this.showAlertMessage = true;
    }
  }

}
