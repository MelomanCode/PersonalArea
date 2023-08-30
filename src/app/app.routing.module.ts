import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'users', component: HomeComponent },
  {
    path: 'user',
    children: [{ path: ':id' , component: UserComponent}],
  },
  { path: '**', redirectTo: 'users' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
