import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false,
})
export class CategoriasPage implements OnInit {
  categorias = [
    { nome: 'Comprimento', icone: 'resize', rota: 'comprimento' },
    { nome: 'Massa', icone: 'barbell', rota: 'massa' },
    { nome: 'Temperatura', icone: 'thermometer', rota: 'temperatura' },
    { nome: 'Tempo', icone: 'time', rota: 'tempo' },
    { nome: 'Área', icone: 'square', rota: 'área' },
    { nome: 'Volume', icone: 'cube', rota: 'volume' },
    { nome: 'Velocidade', icone: 'speedometer', rota: 'velocidade' },
    { nome: 'Energia', icone: 'flash', rota: 'energia' },
  ];

  nomeUsuario: string = 'Usuário';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário';
    }
  }

  ngOnInit(): void {}

  abrirCategoria(rota: string) {
    this.router.navigate(['/conversor', rota]);
  }

  async abrirMenu() {
    console.log('abrirMenu chamado');
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja sair do aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelado');
          },
        },
        {
          text: 'Sair',
          role: 'destructive',
          handler: () => {
            console.log('Logout confirmado');
            this.logout();
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('nomeUsuario');
    this.router.navigate(['/login']);
  }
}
