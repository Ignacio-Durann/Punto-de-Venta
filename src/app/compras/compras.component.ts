import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
level: string;
user: string;
// en id de producto sale undefined linea 28
producto = {idproducto:'', nombreproducto:'',precio: '', comprador:'', unidadescompradas:'' ,totalpagar:'', fecha:'' };
nuevaCompra  = {idcompra:'', idproductos:'', nombrepro:'',precio: '', comprador:'', unidades:'' ,total:'', fecha:'' };
compras: any ;
// compras: any  = [{idcompra:'', idproductos:'', nombrepro:'',precio: '', comprador:'', unidades:'' ,total:'', fecha:'' }];
tmpCompra  = {idcompra:'', idproductos:'', nombrepro:'',precio: '', comprador:'', unidades:'' ,total:'', fecha:'' };

  constructor(private datos: DatosService, private router: Router, private msg: ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.user = this.datos.getCuenta().user;
    this.producto = this.datos.getProActi();
    this.llenarTablaCompras();
    // console.log(this.producto);
  }
  // this.producto.idproducto
 llenarTablaCompras(){
this.datos.getCompra().subscribe( resp => {
  this.compras = resp;
}, error => {
  console.log(error);
  
})
 }


  agregarCompra(){
    if(this.nuevaCompra.idcompra=='' && this.nuevaCompra.idproductos ==''  && this.nuevaCompra.nombrepro=='' && this.nuevaCompra.precio==''
    && this.nuevaCompra.comprador=='' && this.nuevaCompra.unidades=='' && this.nuevaCompra.total=='' && this.nuevaCompra.fecha==''){
      this.msg.error("Ningun campo debe quedarse vacio");
      return;
    }
    // console.log(this.nuevaCompra);
    this.datos.postCompra(this.nuevaCompra).subscribe(resp => {
      if(resp['result'] == 'ok' ){
        let compra = JSON.parse(JSON.stringify(this.nuevaCompra));
        this.compras.push(compra);
        this.nuevaCompra.idcompra = '';
        this.nuevaCompra.idproductos = '';
        this.nuevaCompra.nombrepro = '';
        this.nuevaCompra.precio = '' ;
        this.nuevaCompra.comprador = '';
        this.nuevaCompra.unidades = '';
        this.nuevaCompra.total = '';
        this.nuevaCompra.fecha = '';
        this.msg.success("El producto se guardo correctamente");
        this.llenarTablaCompras();
      }else{
        this.msg.error("El producto no se ha podido guardar");
        console.log(resp);
        
      }
    
    }, error => {
      console.log(error);
    });
  }
  
  temporalCompra(cpr){
    this.tmpCompra = JSON.parse(JSON.stringify(cpr));
  }

  guardarCambios(){
    this.datos.putCompra(this.tmpCompra).subscribe(resp => {
      if(resp['result'] == 'ok' ){
        let i = this.compras.indexOf(this.compras.find( cmp => cmp.idproducto == this.tmpCompra.idcompra));
        // this.compras[i].nombrepro = this.tmpCompra.nombrepro;
        this.msg.success("El producto fue modificado exisotamente.");
        this.llenarTablaCompras();
      }else{
        this.msg.error("El producto no se ha podido modificar.");
        console.log(resp);
        
      }
    }, error =>{
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteCompra(this.tmpCompra).subscribe(resp => {
      if(resp['result'] == 'ok'){
        let i = this.compras.indexOf(this.compras.find( cmp => cmp.idcompra == this.tmpCompra.idcompra));
        this.compras.splice( i, 1 );
        this.msg.success("La Compra se elimino exisotamente");
        this.llenarTablaCompras();
      }else{
        this.msg.error("La compra no se ha podido eliminar")
      }
    }, error => {
      console.log(error);
    });
  }
}
