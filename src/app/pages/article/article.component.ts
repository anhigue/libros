import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from '../../services/ads.service';
import { ArticulosService } from '../../services/articulos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ComentariosService } from '../../services/comentarios.service';

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

  // publicidad de la pagina
  adsObject = [];

  // para los comentarios
  newComment: string;
  newCommentHijo: string;
  showBoxComment: boolean;
  showAlert = false;
  titleAlert: string;
  messageAlert: string;

  comentario: any;
  comentarioHijo: any;
  comentPadre: any;

  usuario: any;

  showRespuesta = false;

  constructor(private admin: AdminService, private param: ActivatedRoute, private ads: AdsService,
              private art: ArticulosService, private user: UsuariosService, private com: ComentariosService) {
    this.getAllAds();
    this.showBoxComment = this.user.isSetUsuario();
  }

  ngOnInit() {
    this.id_articulo = this.param.snapshot.paramMap.get('id');
    this.getArticulo({
      id_articulo: this.id_articulo,
      fk_id_articulo: this.id_articulo
    });
    if (this.user.isSetUsuario()) {
      this.usuario = this.user.getInfoUser();
    }

    this.getComent();
  }

  async getArticulo(art) {
    await this.art.getOne(art).toPromise().then( res => {
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

  dismissAlert() {
    if (this.showAlert) {
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }

  dismissRespuesta(item) {
    if (this.showRespuesta) {
      this.showRespuesta = false;
    } else {
      this.showRespuesta = true;
    }
    this.comentPadre = item;
  }

  createComentario() {
    const coment = {
      comentario: this.newComment,
      id_articulo: this.id_articulo,
      id_usuario: this.usuario.usuario.id_usuario
    };

    this.com.createComentario(coment).toPromise()
    .then( (res: any) => {
      if (res) {
        this.titleAlert = 'Nuevo Comentario';
        this.messageAlert = res.message;
        this.dismissAlert();
      }
    })
    .catch( error => console.log(error));
  }

  createComentarioHijo() {
    const coment = {
      comentario: this.newCommentHijo,
      id_articulo: this.id_articulo,
      id_usuario: this.usuario.usuario.id_usuario,
      id_padre: this.comentPadre.id_comentario
    };

    this.com.createComentarioHijo(coment).toPromise()
    .then( (res: any) => {
      if (res) {
        this.titleAlert = 'Nuevo Comentario';
        this.messageAlert = res.message;
        this.dismissAlert();
        this.dismissRespuesta(null);
      }
    })
    .catch( error => console.log(error));
  }

  async getComent() {
    await this.com.getComentarios({id_articulo: this.id_articulo}).toPromise()
    .then( res => this.comentario = res)
    .catch( error => console.log(error));
  }

  async reportar(item) {
    const coment = {
      id_comentario: item.id_comentario
    };
    this.com.report(coment).toPromise()
    .then( (res: any) => {
      if (res) {
        this.titleAlert = 'Reportar Comentario';
        this.messageAlert = res.message;
        this.dismissAlert();
      }
    })
    .catch( error => console.log(error));
  }
}
