import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any;
  level: string;
  user='';
  nuevoUsuario = {user:'', nombre:'', password: '', edad:'', tipo:'' ,puesto:'' }
  tmpUsuario = {user:'', nombre:'', password: '', edad:'', tipo:'' ,puesto:''}
  constructor(private datos: DatosService, private msg: ToastrService) { }

  ngOnInit(): void {
    this.level = this.datos.getCuenta().level;
    this.user = this.datos.getCuenta().user;
    this.llenarUsuarios();
  }

  llenarUsuarios(){
  this.datos.getUsuarios().subscribe( resp => {
    this.usuarios = resp;
  },error => {
    console.log(error);
    
  });
  }

  agregarUsuario(){
    if(this.nuevoUsuario.user == '' && this.nuevoUsuario.nombre == '' && this.nuevoUsuario.password == '' && this.nuevoUsuario.edad == ''
    &&  this.nuevoUsuario.tipo == '' && this.nuevoUsuario.puesto == ''){
    this.msg.error("Ningun campo debe quedarse vacio.");
    return;
  }

  this.datos.postUsuarios(this.nuevoUsuario).subscribe(resp => {
    if(resp['result'] == 'ok' ){
      let usr = JSON.parse(JSON.stringify(this.nuevoUsuario));
      this.usuarios.push(usr);
      this.nuevoUsuario.user = '';
      this.nuevoUsuario.nombre = '';
      this.nuevoUsuario.password = '';
      this.nuevoUsuario.tipo = '';
      this.nuevoUsuario.edad = '';
      this.nuevoUsuario.puesto= '';
      this.msg.success("El Usuario se registro exitosamente");
      this.llenarUsuarios();
    }else{
      this.msg.error("El Usuario no se pudo guardar");
    }
  }, error =>{
    console.log(error);
    
  });
  }

  temporalUsuarios(usr){
    this.tmpUsuario = JSON.parse(JSON.stringify(usr));
  }

  guardarCambios(){
    this.datos.putUsuarios(this.tmpUsuario).subscribe(resp => {
      if(resp['result'] == 'ok' ){
        let i = this.usuarios.indexOf(this.usuarios.find( usr => usr.user == this.tmpUsuario.user));
        // this.compras[i].nombrepro = this.tmpCompra.nombrepro;
        this.msg.success("El Usuario fue modificado exisotamente.");
        this.llenarUsuarios();
      }else{
        this.msg.error("El Usuario no se ha podido modificar.");
        console.log(resp);
        
      }
    }, error =>{
      console.log(error);
    });
  }

  confirmarEliminar(){
    this.datos.deleteUsuario(this.tmpUsuario).subscribe(resp => {
      if(resp['result'] == 'ok'){
        let i = this.usuarios.indexOf(this.usuarios.find( usr => usr.user == this.tmpUsuario.user));
        this.usuarios.splice( i, 1 );
        this.msg.success("El Usuario se elimino exisotamente");
        this.llenarUsuarios();
      }else{
        this.msg.error("El Usuario no se ha podido eliminar")
      }
    }, error => {
      console.log(error);
    });
  }

}
