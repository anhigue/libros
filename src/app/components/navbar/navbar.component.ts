import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: any;

  constructor() {
    this.getUsuario();
  }

  ngOnInit() {
  }

  getUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

}
