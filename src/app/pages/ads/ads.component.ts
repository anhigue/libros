import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-foundation';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  modalRef: BsModalRef;

  // nuevo anuncion
  newTitleAd: string;
  newImgAd: string;

  // update anuncio
  updateTitleAd: string;
  updateImgAd: string;
  updateIdAd: number;

  // anuncions
  adsObject: any;

  // show message
  showCalloutMessage: boolean;
  titleAlert: string;
  messageAlert: string;

  constructor(private modalService: BsModalService, private ads: AdsService) {
    this.showCalloutMessage = false;
    this.getAds();
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, title?: string, img?: string, id?: number) {
    this.modalRef = this.modalService.show(template, {class: 'tiny'});
    this.updateImgAd = img;
    this.updateTitleAd = title;
    this.updateIdAd = id;
  }

  async createAd() {
    const data = {
      nombre: this.newTitleAd,
      img: this.newImgAd
    };

    await this.ads.create(data).toPromise().then( (response: any) => {
      if (response) {
        this.titleAlert = 'Nueva publicidad';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.modalRef.hide();
        this.getAds();
      }
    }).catch( error => console.log(error));
  }

  async getAds() {
    await this.ads.getAll().toPromise().then( res => this.adsObject = res).catch( error => console.log(error));
  }

  dismissAlert() {
    if (this.showCalloutMessage) {
      this.showCalloutMessage = false;
    } else {
      this.showCalloutMessage = true;
    }
  }

  async deleteAds(ads: any) {
    const data = {
      id_ad: ads.id_publicidad
    };

    await this.ads.delete(data).toPromise().then( (response: any) => {
      if ( response ) {
        this.titleAlert = 'Eliminar publicidad';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.getAds();
      }
    }).catch(error => console.log(error));
  }

  async updateAds() {
    const data = {
      id_ad: this.updateIdAd,
      nombre: this.updateTitleAd,
      img: this.updateImgAd
    };

    await this.ads.update(data).toPromise().then( (response: any) => {
      if (response) {
        this.titleAlert = 'Actualizar publicidad';
        this.messageAlert = response.message;
        this.dismissAlert();
        this.modalRef.hide();
        this.getAds();
      }
    }).catch( error => console.log(error));
  }

}
