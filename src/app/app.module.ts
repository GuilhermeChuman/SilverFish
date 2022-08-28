import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/authGuard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { APIService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    LayoutModule,
    HttpClientModule
  ],
  providers: [APIService, AuthService, AuthGuardService, HttpClient, MatSnackBar, Overlay],
  bootstrap: [AppComponent]
})
export class AppModule { }
