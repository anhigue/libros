import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: any;

  constructor(private route: Router) {
    this.getUsuario();
  }

  ngOnInit() {
  }

  getUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  profile() {
    this.route.navigateByUrl('profile/' + this.usuario.id_usuario);
  }

}
