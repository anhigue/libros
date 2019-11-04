import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasGuard implements CanActivate {

  pase: boolean;

  constructor(private users: UsuariosService, private router: Router) {
    this.pase = this.users.isSetUsuario();
  }

  canActivate() {
    if (this.pase) {
      const usuario: any = this.users.getInfoSub();

      if (usuario.tipo_sub === 'Premium') {
        return true;
      } else {
        this.router.navigateByUrl('categories');
        return false;
      }
    } else {
      this.router.navigateByUrl('categories');
      return false;
    }
  }
}
