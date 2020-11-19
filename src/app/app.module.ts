import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { SeguridadGuard } from './seguridad.guard';
import { HeaderComponent } from './header/header.component';
import { DatosService } from './datos.service';
import { ProductosComponent } from './productos/productos.component';
import { MenuComponent } from './menu/menu.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const rutas: Route[] = [
  {path:'', component: InicioComponent},
  {path:'inicio', component: InicioComponent, canActivate: [SeguridadGuard]},
  {path:'productos', component: ProductosComponent, canActivate: [SeguridadGuard]},
  {path:'compras', component: ComprasComponent, canActivate: [SeguridadGuard]},
  {path:'ventas', component: VentasComponent, canActivate: [SeguridadGuard]},
  {path:'usuarios', component: UsuariosComponent, canActivate: [SeguridadGuard]},
  {path:'*', component: InicioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    InicioComponent,
    HeaderComponent,
    ProductosComponent,
    MenuComponent,
    ComprasComponent,
    VentasComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [DatosService, SeguridadGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
