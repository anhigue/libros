import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticulosGuard implements CanActivate {
  canActivate() {
    const usuario = localStorage.getItem('usuario');
    if ( usuario ) {
      return true;
    } else {
      return false;
    }
  }
}
