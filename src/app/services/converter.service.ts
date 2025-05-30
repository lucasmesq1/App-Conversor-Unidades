import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  convert(category: string, from: string, to: string, value: number): number {
    let result = 0;

    switch(category) {
      case 'Comprimento':
        result = this.convertLength(from, to, value);
        break;
      case 'Temperatura':
        result = this.convertTemperature(from, to, value);
        break;
      case 'Massa':
        result = this.convertMass(from, to, value);
        break;
      // Adicione as demais categorias aqui
      default:
        throw new Error(`Categoria de conversão desconhecida: ${category}`);
    }

    return result;
  }

  private convertLength(from: string, to: string, value: number): number {
    const units: { [key: string]: number } = {
      'm': 1,
      'km': 1000,
      'cm': 0.01,
      'mm': 0.001
    };

    if (!(from in units) || !(to in units)) {
      throw new Error(`Unidade de comprimento inválida: ${from} ou ${to}`);
    }

    return (value * units[from]) / units[to];
  }

  private convertTemperature(from: string, to: string, value: number): number {
    if (from === to) return value;

    if (from === 'C' && to === 'F') return (value * 9/5) + 32;
    if (from === 'F' && to === 'C') return (value - 32) * 5/9;
    if (from === 'C' && to === 'K') return value + 273.15;
    if (from === 'K' && to === 'C') return value - 273.15;
    if (from === 'F' && to === 'K') return ((value - 32) * 5/9) + 273.15;
    if (from === 'K' && to === 'F') return ((value - 273.15) * 9/5) + 32;

    throw new Error(`Conversão de temperatura inválida: ${from} para ${to}`);
  }

  private convertMass(from: string, to: string, value: number): number {
    const units: { [key: string]: number } = {
      'kg': 1,
      'g': 0.001,
      'mg': 0.000001,
      'lb': 0.453592
    };

    if (!(from in units) || !(to in units)) {
      throw new Error(`Unidade de massa inválida: ${from} ou ${to}`);
    }

    return (value * units[from]) / units[to];
  }
}

