import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any;
  level: string;
  user='';
  nuevoProducto = {idproducto:'', nombreproducto:'',precio: '', comprador:'', unidadescompradas:'' ,totalpagar:'', fecha:'' }
  tempProducto = {idproducto:'', nombreproducto:'',precio:'', comprador:'', unidadescompradas:'',totalpagar:'',fecha:''}
  
  constructor(private datos: DatosService, private router: Router, private msg: ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.llenarProductos();
  }

  llenarProductos(){
    this.datos.getProductos().subscribe(resp =>{
      this.productos = resp;
      // console.log(resp);
      
    }, error => {
      console.log(error);
      if(error.status==408) this.router.navigate(['']);    
    });
  }
  
  verProducto(prod){
    console.log(prod + " es el id de producto");
    
    this.datos.setProAct(prod.idproducto, prod.nombreproducto, prod.precio, prod.comprador, prod.unidadescompradas, prod.totalpagar, prod.fehca);
    this.router.navigate(['/compras']);
  }

  agregarProducto(){
    if(this.nuevoProducto.idproducto == '' && this.nuevoProducto.nombreproducto == '' && this.nuevoProducto.precio == '' && this.nuevoProducto.comprador == ''
    && this.nuevoProducto.unidadescompradas == '' && this.nuevoProducto.totalpagar == '' && this.nuevoProducto.fecha == ''){
      this.msg.error("Algun campo solicitado esta vacio");
      return;
    }

    this.datos.postProductoNuevo(this.nuevoProducto).subscribe(resp => {
      if(resp['result'] == 'ok' ){
        let produc = JSON.parse(JSON.stringify(this.nuevoProducto));
        this.productos.push(produc);
        this.nuevoProducto.idproducto = '';
        this.nuevoProducto.nombreproducto = '';
        this.nuevoProducto.precio = '' ;
        this.nuevoProducto.comprador = '';
        this.nuevoProducto.unidadescompradas = '';
        this.nuevoProducto.totalpagar = '';
        this.nuevoProducto.fecha = '';
        this.msg.success("El producto se guardo correctamente");
        this.llenarProductos();
      }else{
        this.msg.error("El producto no se ha podido guardar");
        // console.log(resp);
        
      }
    }, error => {
      console.log(error);
    });
  }

  temporalProducto(producto){
    this.tempProducto = JSON.parse(JSON.stringify(producto));
  }


  guardarCambios(){
    this.datos.putProducto(this.tempProducto).subscribe(resp => {
      if(resp['result'] == 'ok' ){
        let i = this.productos.indexOf(this.productos.find( produc => produc.idproducto == this.tempProducto.idproducto));
        this.productos[i].nombreproducto = this.tempProducto.nombreproducto;
        this.msg.success("El producto fue modificado exisotamente.");
        this.llenarProductos();
      }else{
        this.msg.error("El producto no se ha podido modificar.");
      }
    }, error =>{
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteProducto(this.tempProducto).subscribe(resp => {
      if(resp['result'] == 'ok'){
        let i = this.productos.indexOf(this.productos.find( produc => produc.idproducto == this.tempProducto.idproducto));
        this.productos.splice( i, 1 );
        this.msg.success("El producto se elimino exisotamente");
        this.llenarProductos();
      }else{
        this.msg.error("El producto no se ha podido eliminar")
      }
    }, error => {
      console.log(error);
    });
  }
}
