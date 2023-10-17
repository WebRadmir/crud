import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreatePersonComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
