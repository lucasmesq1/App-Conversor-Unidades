import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
  standalone: false,
})
export class ConversorPage {
  categoria: string | null = null;
  de: string = '';
  para: string = '';
  valor: number | null = null;
  resultado: number | null = null;

  constructor(private route: ActivatedRoute) {
    this.categoria = this.route.snapshot.paramMap.get('categoria') || '';
  }

  ngOnInit() {
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    console.log('Categoria:', this.categoria);
  }

  get opcoes(): string[] {
    switch (this.categoria) {
      case 'comprimento':
        return ['Milímetros', 'Centímetros', 'Metros', 'Quilômetros'];
      case 'massa':
        return ['Gramas', 'Quilogramas', 'Toneladas'];
      case 'temperatura':
        return ['Celsius', 'Fahrenheit', 'Kelvin'];
      case 'tempo':
        return ['Segundos', 'Minutos', 'Horas'];
      case 'area':
        return ['cm²', 'm²', 'km²'];
      case 'volume':
        return ['Mililitros', 'Litros', 'm³'];
      case 'velocidade':
        return ['km/h', 'm/s', 'mph'];
      case 'energia':
        return ['Joules', 'Calorias', 'kWh'];
      default:
        return [];
    }
  }

  converter() {
    if (!this.de || !this.para || this.valor == null) return;

    switch (this.categoria) {
      case 'comprimento':
        this.resultado = this.converterComprimento(
          this.valor,
          this.de,
          this.para
        );
        break;
      case 'massa':
        this.resultado = this.converterMassa(this.valor, this.de, this.para);
        break;
      case 'temperatura':
        this.resultado = this.converterTemperatura(
          this.valor,
          this.de,
          this.para
        );
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
        this.resultado = this.converterVelocidade(
          this.valor,
          this.de,
          this.para
        );
        break;
      case 'energia':
        this.resultado = this.converterEnergia(this.valor, this.de, this.para);
        break;
      default:
        this.resultado = null;
    }
  }

  // ---- Funções de conversão ---- //

  converterComprimento(valor: number, de: string, para: string): number {
    const mm: { [key: string]: number } = {
      Milímetros: 1,
      Centímetros: 10,
      Metros: 1000,
      Quilômetros: 1_000_000,
    };
    if (!mm[de] || !mm[para]) return 0;
    return (valor * mm[de]) / mm[para];
  }

  converterMassa(valor: number, de: string, para: string): number {
    const g: { [key: string]: number } = {
      Gramas: 1,
      Quilogramas: 1000,
      Toneladas: 1_000_000,
    };
    if (!g[de] || !g[para]) return 0;
    return (valor * g[de]) / g[para];
  }

  converterTemperatura(valor: number, de: string, para: string): number {
    let tempCelsius: number = 0;

    // Para Celsius
    if (de === 'Celsius') tempCelsius = valor;
    else if (de === 'Fahrenheit') tempCelsius = (valor - 32) * (5 / 9);
    else if (de === 'Kelvin') tempCelsius = valor - 273.15;
    else return 0; // Caso unidade inválida

    // De Celsius para destino
    if (para === 'Celsius') return tempCelsius;
    else if (para === 'Fahrenheit') return (tempCelsius * 9) / 5 + 32;
    else if (para === 'Kelvin') return tempCelsius + 273.15;

    return 0; // Caso unidade inválida
  }

  converterTempo(valor: number, de: string, para: string): number {
    const s: { [key: string]: number } = {
      Segundos: 1,
      Minutos: 60,
      Horas: 3600,
    };
    if (!s[de] || !s[para]) return 0;
    return (valor * s[de]) / s[para];
  }

  converterArea(valor: number, de: string, para: string): number {
    const cm2: { [key: string]: number } = {
      'cm²': 1,
      'm²': 10_000,
      'km²': 100_000_000,
    };
    if (!cm2[de] || !cm2[para]) return 0;
    return (valor * cm2[de]) / cm2[para];
  }

  converterVolume(valor: number, de: string, para: string): number {
    const ml: { [key: string]: number } = {
      Mililitros: 1,
      Litros: 1000,
      'm³': 1_000_000,
    };
    if (!ml[de] || !ml[para]) return 0;
    return (valor * ml[de]) / ml[para];
  }

  converterVelocidade(valor: number, de: string, para: string): number {
    const ms: { [key: string]: number } = {
      'km/h': 1000 / 3600,
      'm/s': 1,
      mph: 1609.34 / 3600,
    };
    if (!ms[de] || !ms[para]) return 0;
    return (valor * ms[de]) / ms[para];
  }

  converterEnergia(valor: number, de: string, para: string): number {
    const j: { [key: string]: number } = {
      Joules: 1,
      Calorias: 4.184,
      kWh: 3_600_000,
    };
    if (!j[de] || !j[para]) return 0;
    return (valor * j[de]) / j[para];
  }
}
