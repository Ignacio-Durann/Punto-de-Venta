import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

const URL:string = "http://localhost/backEndPuntoVenta/";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private cuenta = {user:"", token:"", level:""};
  private proAct = {idproducto:'', nombreproducto:'',precio:'', comprador:'', unidadescompradas:'',totalpagar:'',fecha:''};
  constructor(private http: HttpClient, private galleta:CookieService) { }

  login(u, p){
    let Params = new HttpParams();
    Params = Params.append('user', u);
    Params = Params.append('password', p);

    return this.http.get(URL + "login.php",{params:Params});

  }

  getCuenta(){
    this.cuenta.user = this.galleta.get('user');
    this.cuenta.token = this.galleta.get('token');
    this.cuenta.level = this.galleta.get('level');
    return this.cuenta;
  }
  
  setCuenta(user,token,nivel){
    this.cuenta.user = user;
    this.cuenta.token = token;
    this.cuenta.level = nivel;
    this.galleta.set('user',user);
    this.galleta.set('token',token);
    this.galleta.set('level',nivel);
  }

  getProductos(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    return this.http.get(URL + "productos.php", { headers:Headers });
  }

  setProAct(idproducto, nombreproducto, precio, comprador, unidadescompradas, totalpagar, fecha){
    this.proAct.idproducto = idproducto;
    this.proAct.nombreproducto = nombreproducto;
    this.proAct.precio = precio;
    this.proAct.comprador = comprador;
    this.proAct.unidadescompradas = unidadescompradas;
    this.proAct.totalpagar = totalpagar;
    this.proAct.fecha = fecha;

    sessionStorage.setItem("idproducto", idproducto);
    sessionStorage.setItem("nombreproducto", nombreproducto);
    sessionStorage.setItem("precio", precio);
    sessionStorage.setItem("comprador", comprador);
    sessionStorage.setItem("unidadescompradas", unidadescompradas);
    sessionStorage.setItem("totalpagar", totalpagar);
    sessionStorage.setItem("fecha", fecha);
  }

 

  putProducto(producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('idproducto', producto.idproducto);
    Params = Params.append('nombreproducto', producto.nombreproducto);
    Params = Params.append('precio', producto.precio);
    Params = Params.append('comprador', producto.comprador);
    Params = Params.append('unidadescompradas', producto.unidadescompradas);
    Params = Params.append('totalpagar', producto.totalpagar);
    Params = Params.append('fecha', producto.fecha);
    return this.http.put(URL + "productos.php", null, {headers: Headers, params: Params});
  }
  putCompra(compra){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let params = new HttpParams();
    params = params.append('idcompra', compra.idcompra);
    params = params.append('idproductos', compra.idproductos);
    params = params.append('nombrepro', compra.nombrepro);
    params = params.append('precio', compra.precio);
    params = params.append('comprador', compra.comprador);
    params = params.append('unidades', compra.unidades);
    params = params.append('total', compra.total);
    params = params.append('fecha', compra.fecha);

    return this.http.put(URL + "compras.php", null, {headers:Headers, params: params});
  }


  
  deleteProducto(producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    
    let Params = new HttpParams();
    Params = Params.append('idproducto', producto.idproducto);

    return this.http.delete(URL + "productos.php", {headers: Headers, params: Params});
  }

  getProActi(){
    this.proAct.idproducto = sessionStorage.getItem("idproducto");
    this.proAct.nombreproducto = sessionStorage.getItem("nombreproducto");
    this.proAct.precio = sessionStorage.getItem("precio");
    this.proAct.comprador = sessionStorage.getItem("comprador");
    this.proAct.unidadescompradas = sessionStorage.getItem("unidadescompradas");
    this.proAct.totalpagar = sessionStorage.getItem("totalpagar");
    this.proAct.fecha = sessionStorage.getItem("fecha");
    return this.proAct;
  }

  getCompra(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    return this.http.get(URL + "compras.php", { headers:Headers });
  }

  postProductoNuevo(producto){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('idproducto', producto.idproducto);
    formData.append('nombreproducto', producto.nombreproducto);
    formData.append('precio', producto.precio);
    formData.append('comprador', producto.comprador);
    formData.append('unidadescompradas', producto.unidadescompradas);
    formData.append('totalpagar', producto.totalpagar);
    formData.append('fecha', producto.fecha);
    return this.http.post(URL + "productos.php", formData, {headers:Headers});
  }
  
  postCompra(compra){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('idcompra', compra.idcompra);
    formData.append('idproductos', compra.idproducto);
    formData.append('nombrepro', compra.nombrepro);
    formData.append('precio', compra.precio);
    formData.append('comprador', compra.comprador);
    formData.append('unidades', compra.unidades);
    formData.append('total', compra.total);
    formData.append('fecha', compra.fecha);

    return this.http.post(URL + "compras.php", formData, {headers:Headers});
  }

  

  deleteCompra(compra){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('idcompra', compra.idcompra);
    return this.http.delete(URL + "compras.php", {headers: Headers, params: Params});
  }

  getVenta(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    return this.http.get(URL + "ventas.php", { headers:Headers });
  }

  postVenta(venta){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('idventas', venta.idventas);
    formData.append('nombre', venta.nombre);
    formData.append('vendido', venta.vendido);
    formData.append('vendio', venta.vendio);
    formData.append('precio', venta.precio);
    formData.append('total', venta.total);
    formData.append('fecha', venta.fecha);

    return this.http.post(URL + "ventas.php", formData, {headers:Headers});
  }

  putVentas(venta){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let params = new HttpParams();
    params = params.append('idventas', venta.idventas);
    params = params.append('nombre', venta.nombre);
    params = params.append('vendido', venta.vendido);
    params = params.append('vendio', venta.vendio);
    params = params.append('precio', venta.precio);
    params = params.append('total', venta.total);
    params = params.append('fecha', venta.fecha);

    return this.http.put(URL + "ventas.php", null, {headers:Headers, params: params});
  }

  deleteVentas(venta){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('idventas', venta.idventas);
    return this.http.delete(URL + "ventas.php", {headers: Headers, params: Params});
  }

  getUsuarios(){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    return this.http.get(URL + "usuarios.php", { headers:Headers });
  }

  postUsuarios(usr){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let formData = new FormData();
    formData.append('user', usr.user);
    formData.append('nombre', usr.nombre);
    formData.append('password', usr.password);
    formData.append('tipo', usr.tipo);
    formData.append('edad', usr.edad);
    formData.append('puesto', usr.puesto);
    return this.http.post(URL + "usuarios.php", formData, {headers:Headers});
  }

  putUsuarios(usr){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);
    let params = new HttpParams();
    params = params.append('user', usr.user);
    params = params.append('nombre', usr.nombre);
    params = params.append('password', usr.password);
    params = params.append('tipo', usr.tipo);
    params = params.append('edad', usr.edad);
    params = params.append('puesto', usr.puesto);
    return this.http.put(URL + "usuarios.php", null, {headers:Headers, params: params});
  }

  deleteUsuario(usr){
    let Headers = new HttpHeaders();
    Headers = Headers.append('Authorization', this.cuenta.token);

    let Params = new HttpParams();
    Params = Params.append('user', usr.user);
    return this.http.delete(URL + "usuarios.php", {headers: Headers, params: Params});
  }

}
