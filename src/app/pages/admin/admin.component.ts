import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-foundation';
import { element } from 'protractor';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from '../../services/message.service';

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

  // para cambiar el rol del usuario
  cambioUsuario: any;
  cambioRol: any;
  cambioCategoria: any;
  cambioSubCategoria: any;

  oneAtATime = true;

  messageModal: TemplateRef<any>;

  // show alert
  showAlertAction: boolean;
  titleAlert: string;
  messageAlert: string;

  constructor(private admin: AdminService, private modalService: BsModalService, private users: UsuariosService) {
    this.get();
    this.showAlertAction = false;
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

  async cambioTipoUsuario() {
    const dataSend = {
      id_usuario: this.cambioUsuario.fk_id_usuario,
      tipo_usuario: this.cambioRol
    };

    await this.admin.updateRolUsuario(dataSend).toPromise().then( response => {
      if (response) {
        console.log(response);
        this.modalRef.hide();
        this.get();
      }
    });
  }

  getUsuarioCambio(usuario: any) {
    this.cambioUsuario = usuario;
  }

  getCategoriaCambio(categoria: any) {
    this.cambioCategoria = categoria;
  }

  getSubcategoriaCambio(subcategoria: any) {
    this.cambioSubCategoria = subcategoria;
  }

  eliminarUsuario() {
    const usuario = { id_usuario: this.cambioUsuario.fk_id_usuario };

    this.users.disableUser(usuario).toPromise().then( (response: any) => {
      if (response) {
        console.log(response);
        this.titleAlert = 'Deshabilitado';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.modalRef.hide();
      }
    }).catch(console.error);
  }

  dismissAlert() {
    if (this.showAlertAction) {
      this.showAlertAction = false;
    } else {
      this.showAlertAction = true;
    }
  }

  async eliminarCategoria() {
    const data = { id_categoria: this.cambioCategoria.id_categoria};

    await this.admin.deleteCat(data).toPromise().then( (response: any) => {
      if (response) {
        this.titleAlert = 'Eliminar Categoria';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.modalRef.hide();
        this.get();
      }
    }).catch(console.error);
  }

  async eliminarSubcategoria() {
    const data = { id_sub_categoria: this.cambioSubCategoria.id_sub_categoria};

    await this.admin.deleteSubCat(data).toPromise().then( (response: any) => {
      if (response) {
        this.titleAlert = 'Eliminar Sub Categoria';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.modalRef.hide();
        this.get();
      }
    }).catch(console.error);
  }
}
