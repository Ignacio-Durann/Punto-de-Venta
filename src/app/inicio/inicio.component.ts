import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { DatosService } from '../datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  inicio = "Inicio de sesión";
  user = "";
  password = "";
  auth = false;

  entrar(){
    this.datos.login(this.user, this.password).subscribe(resp =>{
      if(resp['auth'] == 'si'){
          this.datos.setCuenta(this.user, resp['token'], resp['level']);
          this.router.navigate(['/productos']);
          this.msg.success("Bienvenido");
      }else{
        this.msg.error("Error de usuario y/o contraseña");
      }
    }, error => {
      this.msg.error("Error de conexión");
      console.log(error);
    })
  }
  constructor(private datos: DatosService, private msg: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

}
