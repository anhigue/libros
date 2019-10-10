import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { AsksComponent } from './pages/asks/asks.component';
import { AboutComponent } from './pages/about/about.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ArticleComponent } from './pages/article/article.component';
import { AdsComponent } from './pages/ads/ads.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'moderation',
    component: ModerationComponent
  },
  {
    path: 'login',
    component: LoginRegisterComponent
  },
  {
    path: 'asks',
    component: AsksComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'ads',
    component: AdsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
