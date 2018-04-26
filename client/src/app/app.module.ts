import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { BucketlistService } from './bucketlist.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomedashComponent } from './home/homedash/homedash.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    HomeComponent,
    LoginComponent,
    HomedashComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    UserService,
    BucketlistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
