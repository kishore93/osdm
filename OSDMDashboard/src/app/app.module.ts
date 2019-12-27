import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCheckboxModule, MatFormFieldModule, MatPlaceholder, MatAutocomplete, MatOption, MatAutocompleteModule, MatInputModule, MatSelectModule, MatExpansionModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EmojiModule } from 'angular-emoji/dist';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HeatMapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MDBBootstrapModule,
    EmojiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
