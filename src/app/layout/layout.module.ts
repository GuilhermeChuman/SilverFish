import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutRoutingModule } from './layout-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderSideComponent } from './header-side-layout/header-side.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [],
  declarations: [
    MainLayoutComponent,
    HeaderSideComponent,
    AuthLayoutComponent
  ]
})
export class LayoutModule { }