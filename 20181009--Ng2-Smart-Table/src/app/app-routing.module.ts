import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DemoLocalSourceComponent } from './demo-local-source/demo-local-source.component';
import { DemoServerSourceComponent } from './demo-server-source/demo-server-source.component';


const routes: Routes = [
  { path: 'local', component: DemoLocalSourceComponent },
  { path: 'server', component: DemoServerSourceComponent },
  { path: '', redirectTo: 'local', pathMatch: 'full' },
  { path: '**', redirectTo: 'local' }

];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
