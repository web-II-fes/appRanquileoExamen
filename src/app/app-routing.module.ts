import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {PedidoComponent} from './componentes/pedido/pedido.component';
const routes: Routes = [

  { path: 'pedido-component', component: PedidoComponent},
  {path: '', redirectTo: 'pedido-component', pathMatch: 'full'},
  {path: '**', component: PedidoComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
