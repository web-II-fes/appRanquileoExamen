import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {PedidoService} from './servicios/pedido.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  itemForm: FormGroup;

  pedidos: any[] = [];
  idPedido: any;
  text: string = 'Mostrar Formulario';
  show: any = false;
  displayedColumns: string[] = ['nombre', 'direccion', 'comida','fechaEntrega', 'editar', 'borrar'];



  constructor(private fb: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.iniciarFormulario();

    this.getPedido();
  }
  iniciarFormulario() {
    this.itemForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      comida: [''],
      fechaEntrega: ['']
    });
  }

  getPedido() {
    this.pedidoService.getPedidos().subscribe((pedidos: any) => {
      this.pedidos = pedidos;
    });
  }

  editarPedido(pedido: any) {
    this.idPedido = pedido._id;
    this.itemForm.patchValue({
      nombre: pedido.nombre,
      direccion: pedido.direccion,
      comida: pedido.comida,
      fechaEntrega: pedido.fechaEntrega
    });
  }

  borrarPedido(pedido: any) {
    this.idPedido = pedido._id;
    this.pedidoService.borrarPedido(this.idPedido).subscribe(result => console.log('Se borro a: ', pedido));
    this.getPedido();
  }

  submit() {
    if (this.idPedido) {
      this.pedidoService.editarPedido(this.idPedido, this.itemForm.value).subscribe((pedido) => {
        console.log('Persona Editada: ', pedido);
      });
    } else {
      this.pedidoService.guardarPedido(this.itemForm.value).subscribe((pedido) => {
        console.log('Persona Nueva: ', pedido);
      });
    }
    this.getPedido();
  }

  showForm() {
    this.show = !this.show;
    console.log(this.pedidos);
    if (this.show) {
      this.text = 'Ocultar Formulario';
    }
    else {
      this.text = 'Mostrar Formulario';
    }
  }



}
