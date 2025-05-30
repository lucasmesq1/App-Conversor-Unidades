import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Importação da HomePage (se não for carregada via lazy loading)
import { HomePage } from './home/home.page';

// Serviços
import { ConverterService } from './services/converter.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePage  // Caso não use lazy loading
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ConverterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

