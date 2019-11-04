import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: any;

  constructor(private route: Router, private users: UsuariosService) {}

  ngOnInit() {
  }

  goToNexPage() {
    if (this.users.isSetUsuario()) {
      this.route.navigateByUrl('profile');
    } else {
      this.route.navigateByUrl('login');
    }
  }

}
