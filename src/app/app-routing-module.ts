import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesManagerComponent } from './pages/courses-manager/courses-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
