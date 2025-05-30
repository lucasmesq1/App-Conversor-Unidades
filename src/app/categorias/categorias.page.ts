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
    { nome: 'Comprimento', icone: 'resize', rota: 'Comprimento' },
    { nome: 'Massa', icone: 'barbell', rota: 'Massa' },
    { nome: 'Temperatura', icone: 'thermometer', rota: 'Temperatura' },
    { nome: 'Tempo', icone: 'time', rota: 'Tempo' },
    { nome: 'Área', icone: 'square', rota: 'Área' },
    { nome: 'Volume', icone: 'cube', rota: 'Volume' },
    { nome: 'Velocidade', icone: 'speedometer', rota: 'Velocidade' },
    { nome: 'Energia', icone: 'flash', rota: 'Energia' },
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
