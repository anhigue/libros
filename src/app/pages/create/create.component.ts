import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  plantillaA: boolean;
  plantillaB: boolean;
  plantillaC: boolean;
  hidenInformation: boolean;
  hidenInformation2: boolean;

  estados: any;

  // para crear el articulo
  estado: any;
  titulo: string;
  plantilla: number;
  categorias: any;
  categoria: any;
  link: any;
  // para crear las imagenes
  imagenA: string;
  imagenB: string;
  imagenC: string;
  imagenD: string;

  // para crear los parrafos
  parrafoA: string;
  parrafoB: string;
  parrafoC: string;
  parrafoD: string;

  // para crear los links
  links: object[] = [];
  subcategorias: object[] = [];

  constructor(private admin: AdminService, private users: UsuariosService) {
    this.plantillaA = true;
    this.plantillaB = false;
    this.plantillaC = false;
    this.getEstados();
    this.hidenInformation = true;
    this.hidenInformation2 = false;
    this.getCategorias();
  }

  ngOnInit() {
  }

  ChangedPlantilla(plantilla) {
    if ( plantilla * 1 === 1) {
      this.plantillaA = true;
      this.plantillaB = false;
      this.plantillaC = false;
    } else if ( plantilla * 1 === 2 ) {
      this.plantillaA = false;
      this.plantillaB = true;
      this.plantillaC = false;
    } else if ( plantilla * 1 === 3 ) {
      this.plantillaA = false;
      this.plantillaB = false;
      this.plantillaC = true;
    }
  }

  async getEstados() {
    await this.admin.getEstados().toPromise().then(
      (res: object[]) => {
        this.estados = res.filter( (estado: any) => estado.nombre_estado === 'Draft' || estado.nombre_estado === 'Revisión');
      }
    );
  }

  async create() {
    const articulo = {
      titulo: this.titulo,
      fk_id_estado: this.estado,
      plantilla_articulo: this.plantilla,
      id_usuario: this.users.getInfoUser().usuario.id_usuario
    };

    if (
      articulo.titulo !== undefined ||
      articulo.titulo !== '' ||
      articulo.fk_id_estado !== undefined ||
      articulo.plantilla_articulo !== undefined
      ) {
      // primero creo el articulo e imprimo su valor en una constante
      await this.admin.createArticulo(articulo).toPromise().then( async (res) => {
        const articuloNew: any = res;
        // si recibo un articulo
        if (articuloNew.id_articulo !== 0) {
           const parrafo: object[] = [];
           const img: object[] = [];

           localStorage.setItem('articuloNew', JSON.stringify(articuloNew));

           parrafo.push({
            id_articulo: articuloNew.id_articulo,
            parrafo: this.parrafoA
           });

           parrafo.push({
            id_articulo: articuloNew.id_articulo,
            parrafo: this.parrafoB
           });

           parrafo.push({
            id_articulo: articuloNew.id_articulo,
            parrafo: this.parrafoC
           });

           // tslint:disable-next-line:prefer-for-of
           for (let index = 0; index < parrafo.length; index++) {
              const element = parrafo[index];
              await this.admin.createParrafo(element).toPromise().then( (rest: any) => {
                if (rest.message === 'Se ha agregado correctamente un nuevo parrafo.') {
                  console.log('Se a agregado un nuevo parrafo');
                } else {
                  console.log('Error al crear el articulo');
                }
              });
           }

           img.push({
            id_articulo: articuloNew.id_articulo,
            path: this.imagenA || 'https://placehold.it/400x370'
           });

           img.push({
            id_articulo: articuloNew.id_articulo,
            path: this.imagenB || 'https://placehold.it/400x370'
           });

           img.push({
            id_articulo: articuloNew.id_articulo,
            path: this.imagenC || 'https://placehold.it/400x370'
           });

           if (this.plantilla === 2) {
            img.push({
              id_articulo: articuloNew.id_articulo,
              path: this.imagenD || 'https://placehold.it/400x370'
             });
           }

           // tslint:disable-next-line:prefer-for-of
           for (let index = 0; index < img.length; index++) {
             const element = img[index];
             await this.admin.createImagen(element).toPromise().then( restful => {
              console.log(restful);
            });
           }

           this.clearScope();
           this.changeHiden();
        }
      });
    }
  }

  clearScope() {
    this.estado = undefined;
    this.imagenA = undefined;
    this.imagenB = undefined;
    this.imagenC = undefined;
    this.imagenD = undefined;
    this.parrafoA = undefined;
    this.parrafoB = undefined;
    this.parrafoC = undefined;
    this.titulo = undefined;
  }

  changeHiden() {
    if (this.hidenInformation) {
      this.hidenInformation = false;
      this.hidenInformation2 = true;
    } else {
      this.hidenInformation = true;
      this.hidenInformation2 = false;
    }
  }

  async getCategorias() {
    await this.admin.getCategoriaSub().toPromise().then( res => this.categorias = res);
  }

  pushing(object: object[], item: any) {
    object.push({
      id_articulo: JSON.parse(localStorage.getItem('articuloNew')).id_articulo,
      id_sub_categoria: item,
      nombre: this.categorias.filter( (valor: any) => valor.id_sub_categoria === item)[0].nombre_sub_categoria
    });
    console.log(object);
  }

  pushingB(object: object[], item: any) {
    object.push({
      id_articulo: JSON.parse(localStorage.getItem('articuloNew')).id_articulo,
      link: item
    });
    console.log(object);
  }

  deleteElemento(object: object[], item) {
    const index = object.indexOf(item);
    if ( index > -1 ) {
      object.splice(index, 1);
    }
  }

  async setComplementos() {
    if (this.links.length > 0 && this.subcategorias.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.subcategorias.length; index++) {
        const element = this.subcategorias[index];
        await this.admin.createCategoria(element).toPromise().then( res => console.log(res));
      }

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.links.length; index++) {
        const element = this.links[index];
        await this.admin.createLink(element).toPromise().then( res => console.log(res));
      }
      this.changeHiden();
    } else {
      console.log('Error');
    }
  }
}
