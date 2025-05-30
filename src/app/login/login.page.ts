import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  async mostrarToast(mensagem: string, cor: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      color: cor,
      buttons: [{ text: 'X', role: 'cancel' }],
    });
    await toast.present();
  }

  async logar() {
    const emailLimpo = this.email.trim();
    const senhaDigitada = this.senha.trim();

    if (!emailLimpo || !senhaDigitada) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Entrando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const usuarios = await this.perfilService
        .getUsuarioPorEmail(emailLimpo)
        .toPromise();

      await loading.dismiss();

      if (usuarios && usuarios.length > 0) {
        const usuario = usuarios[0];

        if (usuario.senha?.trim() === senhaDigitada) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('email', emailLimpo);

          this.email = '';
          this.senha = '';
          this.router.navigate(['/tabs/tab1']);
        } else {
          this.mostrarToast('Senha incorreta.');
        }
      } else {
        this.mostrarToast('Email não encontrado.');
      }
    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao fazer login:', error);
      this.mostrarToast('Erro ao conectar ao servidor.');
    }
  }
}
