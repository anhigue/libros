import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { element } from 'protractor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  roles: any;
  generos: any;
  modalRef: BsModalRef;
  categorias: any;
  subcat: any;
  usuarios: any;
  categ: any;
  tipoCat: any;
  changePlantilla: any;

  // para crear una nueva categoria
  nombreCatNew: string;
  tipoCatNew: number;
  imgCatNew: string;

  // para crear una nueva sub categoria
  nombreSubCatNew: string;
  idNewSub: number;
  imgSubCatNew: string;

  // para cambiar la plantilla
  cambio: number;

  oneAtATime = true;

  constructor(private admin: AdminService, private modalService: BsModalService) {
    this.get();
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, tam: string, u ?: any, tipo?: number) {
    this.modalRef = this.modalService.show(template, {class: tam});

    if (tipo === 4) {
      console.log(u);
    }
  }

  async get() {
    await this.admin.getRol().toPromise().then( res => this.roles = res);
    await this.admin.getGenero().toPromise().then( res => this.generos = res);
    await this.admin.getCategoriaSub().toPromise().then( (res: object[]) => {
      this.categorias = res;
    });
    await this.admin.getCategoriaSub().toPromise().then( (res: object[]) => {
      // tslint:disable-next-line:no-shadowed-variable
      this.subcat = res.filter( (res: any) => res.nombre_sub_categoria !== null);
    });
    await this.admin.getUsuarios().toPromise().then( res => this.usuarios = res);
    await this.admin.getCategorias().toPromise().then( res => this.categ = res);
    await this.admin.getTipoCategorias().toPromise().then( res => this.tipoCat = res);
    await this.admin.getChangePlantillas().toPromise().then( res => this.changePlantilla = res);
  }

  async cCategoria() {
    const cat = {
      nombre: this.nombreCatNew,
      tipo: this.tipoCatNew,
      img: this.imgCatNew
    };

    await this.admin.createCat(cat).toPromise().then( res => {
      if (res) {
        console.log(res);
        this.admin.getCategorias().toPromise().then( rest => {this.categ = rest; this.modalRef.hide(); });
      }
    });
  }

  async cSubCategoria() {
    const subCat = {
      nombre: this.nombreSubCatNew,
      id_categoria: this.idNewSub,
      img: this.imgSubCatNew
    };

    await this.admin.createSubCat(subCat).toPromise().then( res => {
      if (res) {
        this.admin.getCategoriaSub().toPromise().then( (rest: object[]) => {
          // tslint:disable-next-line:no-shadowed-variable
          this.subcat = rest.filter( (res: any) => res.nombre_sub_categoria !== null);
          this.modalRef.hide();
        });
      }
    });
  }

  async cp() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const data = {id_usuario: usuario.id_usuario, plantilla: this.cambio };
    await this.admin.changePlantilla(data).toPromise().then( (res: any) => {
      if (res.message) {
        this.admin.getChangePlantillas().toPromise().then( rest => this.changePlantilla = rest);
        this.modalRef.hide();
      }
    });
  }

}
