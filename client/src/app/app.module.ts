import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HomedashComponent } from './home/homedash/homedash.component';
import { UserService } from './user.service';
import { AppointmentService } from './appointment.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    HomeComponent,
    LoginComponent,
    HomedashComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    UserService,
    AppointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
