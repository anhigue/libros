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

  constructor(private admin: AdminService, private modalService: BsModalService) {
    this.get();
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, u ?: any, tipo?: number) {
    this.modalRef = this.modalService.show(template, {class: 'tiny'});

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
  }

}
