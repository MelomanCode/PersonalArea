import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PersonalAreaComponent} from "./personal-area/personal-area.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'personal-area', component: PersonalAreaComponent},
  {path: '**', redirectTo: 'home'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
