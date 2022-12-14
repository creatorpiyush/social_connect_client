import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Social Connect' },
  {
    path: 'login',
    component: UserLoginComponent,
    title: 'Login | Social Connect',
  },
  {
    path: 'register',
    component: UserRegisterComponent,
    title: 'Register | Social Connect',
  },

  {
    path: 'users',
    component: UsersComponent,
    title: 'Users | Social Connect',
  },

  {
    path: 'users/:username',
    component: UserProfileComponent,
    title: 'Profile | Social Connect',
  },

  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found | Social Connect',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
