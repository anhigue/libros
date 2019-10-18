import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  usuario: any;
  oneAtATime = true;
  constructor() {
    this.getUsuario();
  }

  ngOnInit() {

  }

  getUsuario() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

}
