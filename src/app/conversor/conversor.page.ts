import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
  standalone: false,
})
export class ConversorPage implements OnInit {
  categoria: string = '';
  de: string = '';
  para: string = '';
  valor: number | null = null;
  resultado: number | null = null;
  opcoes: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
    this.definirOpcoes();
  }

  definirOpcoes() {
    switch (this.categoria) {
      case 'comprimento':
        this.opcoes = ['Milímetros', 'Centímetros', 'Metros', 'Quilômetros'];
        break;
      case 'massa':
        this.opcoes = ['Gramas', 'Quilogramas', 'Toneladas'];
        break;
      case 'temperatura':
        this.opcoes = ['Celsius', 'Fahrenheit', 'Kelvin'];
        break;
      case 'tempo':
        this.opcoes = ['Segundos', 'Minutos', 'Horas'];
        break;
      case 'area':
        this.opcoes = ['cm²', 'm²', 'km²'];
        break;
      case 'volume':
        this.opcoes = ['Mililitros', 'Litros', 'm³'];
        break;
      case 'velocidade':
        this.opcoes = ['km/h', 'm/s', 'mph'];
        break;
      case 'energia':
        this.opcoes = ['Joules', 'Calorias', 'kWh'];
        break;
      default:
        this.opcoes = [];
    }
  }

  converter() {
    if (!this.de || !this.para || this.valor === null || isNaN(this.valor)) {
      this.resultado = null;
      return;
    }

    switch (this.categoria) {
      case 'comprimento':
        this.resultado = this.converterComprimento(this.valor, this.de, this.para);
        break;
      case 'massa':
        this.resultado = this.converterMassa(this.valor, this.de, this.para);
        break;
      case 'temperatura':
        this.resultado = this.converterTemperatura(this.valor, this.de, this.para);
        break;
      case 'tempo':
        this.resultado = this.converterTempo(this.valor, this.de, this.para);
        break;
      case 'area':
        this.resultado = this.converterArea(this.valor, this.de, this.para);
        break;
      case 'volume':
        this.resultado = this.converterVolume(this.valor, this.de, this.para);
        break;
      case 'velocidade':
        this.resultado = this.converterVelocidade(this.valor, this.de, this.para);
        break;
      case 'energia':
        this.resultado = this.converterEnergia(this.valor, this.de, this.para);
        break;
      default:
        this.resultado = null;
    }
  }

  converterComprimento(valor: number, de: string, para: string): number {
    const mm = { Milímetros: 1, Centímetros: 10, Metros: 1000, Quilômetros: 1_000_000 };
    return (valor * mm[de as keyof typeof mm]) / mm[para as keyof typeof mm];
  }

  converterMassa(valor: number, de: string, para: string): number {
    const g = { Gramas: 1, Quilogramas: 1000, Toneladas: 1_000_000 };
    return (valor * g[de as keyof typeof g]) / g[para as keyof typeof g];
  }

  converterTemperatura(valor: number, de: string, para: string): number {
    let tempC = 0;
    if (de === 'Celsius') tempC = valor;
    else if (de === 'Fahrenheit') tempC = (valor - 32) * 5 / 9;
    else if (de === 'Kelvin') tempC = valor - 273.15;

    if (para === 'Celsius') return tempC;
    else if (para === 'Fahrenheit') return (tempC * 9 / 5) + 32;
    else if (para === 'Kelvin') return tempC + 273.15;
    return 0;
  }

  converterTempo(valor: number, de: string, para: string): number {
    const s = { Segundos: 1, Minutos: 60, Horas: 3600 };
    return (valor * s[de as keyof typeof s]) / s[para as keyof typeof s];
  }

  converterArea(valor: number, de: string, para: string): number {
    const cm2 = { 'cm²': 1, 'm²': 10_000, 'km²': 100_000_000 };
    return (valor * cm2[de as keyof typeof cm2]) / cm2[para as keyof typeof cm2];
  }

  converterVolume(valor: number, de: string, para: string): number {
    const ml = { Mililitros: 1, Litros: 1000, 'm³': 1_000_000 };
    return (valor * ml[de as keyof typeof ml]) / ml[para as keyof typeof ml];
  }

  converterVelocidade(valor: number, de: string, para: string): number {
    const ms = { 'km/h': 1000 / 3600, 'm/s': 1, 'mph': 1609.34 / 3600 };
    return (valor * ms[de as keyof typeof ms]) / ms[para as keyof typeof ms];
  }

  converterEnergia(valor: number, de: string, para: string): number {
    const j = { Joules: 1, Calorias: 4.184, kWh: 3_600_000 };
    return (valor * j[de as keyof typeof j]) / j[para as keyof typeof j];
  }
}
