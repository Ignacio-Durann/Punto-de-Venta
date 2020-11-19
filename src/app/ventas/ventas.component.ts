import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any;
  level: string;
  user='';
  nuevaVenta = {idventas:'', nombre:'', vendido: '', vendio:'', precio:'' ,total:'', fecha:'' }
  tmpVenta = {idventas:'', nombre:'', vendido: '', vendio:'', precio:'' ,total:'', fecha:''}
  constructor(private router: Router, private datos: DatosService, private msg: ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.user = this.datos.getCuenta().user;
    this.llenarVentas();
  }
llenarVentas(){
  this.datos.getVenta().subscribe( resp => {
    this.ventas = resp;
  },error => {
    console.log(error);
    
  });
}

agregarVenta(){
  if(this.nuevaVenta.idventas == '' && this.nuevaVenta.nombre == '' && this.nuevaVenta.vendido && this.nuevaVenta.vendio
  && this.nuevaVenta.precio == '' && this.nuevaVenta.total == '' && this.nuevaVenta.fecha == ''){
    this.msg.error("Ningun campo debe quedarse vacio.");
    return;
  }

  this.datos.postVenta(this.nuevaVenta).subscribe(resp => {
    if(resp['result'] == 'ok' ){
      let venta = JSON.parse(JSON.stringify(this.nuevaVenta));
      this.ventas.push(venta);
      this.nuevaVenta.idventas = '';
      this.nuevaVenta.nombre = '';
      this.nuevaVenta.vendido = '';
      this.nuevaVenta.vendio = '';
      this.nuevaVenta.precio = '';
      this.nuevaVenta.total = '';
      this.nuevaVenta.fecha = '';
      this.msg.success("La venta se registro exitosamente");
      this.llenarVentas();
    }else{
      this.msg.error("La venta no se pudo guardar");
    }
  }, error =>{
    console.log(error);
    
  });
}

temporalVenta(vta){
  this.tmpVenta = JSON.parse(JSON.stringify(vta));
}

guardarCambios(){
  this.datos.putVentas(this.tmpVenta).subscribe(resp => {
    if(resp['result'] == 'ok' ){
      let i = this.ventas.indexOf(this.ventas.find( vta => vta.idventas == this.tmpVenta.idventas));
      // this.compras[i].nombrepro = this.tmpCompra.nombrepro;
      this.msg.success("El producto fue modificado exisotamente.");
      this.llenarVentas();
    }else{
      this.msg.error("El producto no se ha podido modificar.");
      console.log(resp);
      
    }
  }, error =>{
    console.log(error);
  });
}

confirmarEliminar(){
  this.datos.deleteVentas(this.tmpVenta).subscribe(resp => {
    if(resp['result'] == 'ok'){
      let i = this.ventas.indexOf(this.ventas.find( vta => vta.idventas == this.tmpVenta.idventas));
      this.ventas.splice( i, 1 );
      this.msg.success("La Compra se elimino exisotamente");
      this.llenarVentas();
    }else{
      this.msg.error("La compra no se ha podido eliminar")
    }
  }, error => {
    console.log(error);
  });
}
}
