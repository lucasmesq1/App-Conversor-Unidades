import { Component } from '@angular/core';
import { ConverterService } from '../services/converter.service';
import { Conversion } from '../models/conversion.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  categories = ['Comprimento', 'Temperatura', 'Massa'];
  units = {
    'Comprimento': ['m', 'km', 'cm', 'mm'],
    'Temperatura': ['C', 'F', 'K'],
    'Massa': ['kg', 'g', 'mg', 'lb']
  };

  category = 'Comprimento';
  fromUnit = 'm';
  toUnit = 'km';
  inputValue = 0;
  result = 0;
  history: Conversion[] = [];

  constructor(private converterService: ConverterService) {}

  convert() {
    this.result = this.converterService.convert(this.category, this.fromUnit, this.toUnit, this.inputValue);
    this.history.unshift({
      category: this.category,
      fromUnit: this.fromUnit,
      toUnit: this.toUnit,
      inputValue: this.inputValue,
      result: this.result
    });
  }

}
