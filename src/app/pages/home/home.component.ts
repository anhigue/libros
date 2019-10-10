import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  destacados: any;

  constructor(private admin: AdminService) {
    this.getDestacados();
  }

  ngOnInit() {
  }

  async getDestacados() {
    await this.admin.getDestacados().toPromise().then( res => {this.destacados = res; console.log(res); });
  }
}
