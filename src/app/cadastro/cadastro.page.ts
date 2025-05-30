import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false
})
export class CadastroPage {
  nome: string = '';
  email: string = '';
  senha: string = '';

  corPopup: string = 'erro';
  mensagemErro: string = '';

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  async cadastrar() {
    const emailLimpo = this.email.trim();

    if (!this.nome.trim() || !emailLimpo || !this.senha.trim()) {
      this.corPopup = 'erro';
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      setTimeout(() => { this.mensagemErro = ''; }, 3000);
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);
    if (!emailValido) {
      this.corPopup = 'erro';
      this.mensagemErro = 'Digite um email válido.';
      setTimeout(() => { this.mensagemErro = ''; }, 3000);
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Verificando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const usuarios = await this.perfilService.getUsuarioPorEmail(emailLimpo).toPromise();
      if (usuarios && usuarios.length > 0) {
        await loading.dismiss();
        this.corPopup = 'erro';
        this.mensagemErro = 'Já existe um usuário com esse email.';
        setTimeout(() => { this.mensagemErro = ''; }, 3000);
        return;
      }

      const usuario = {
        nome: this.nome.trim(),
        email: emailLimpo,
        senha: this.senha,
      };

      await this.perfilService.criarUsuario(usuario).toPromise();
      await loading.dismiss();

      this.corPopup = 'sucesso';
      this.mensagemErro = 'Cadastro realizado com sucesso!';
      setTimeout(() => {
        this.mensagemErro = '';
        this.router.navigate(['/login']);
      }, 1500);

    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao cadastrar:', error);
      this.corPopup = 'erro';
      this.mensagemErro = 'Erro ao cadastrar. Verifique sua conexão.';
      setTimeout(() => { this.mensagemErro = ''; }, 3000);
      this.mostrarToast(this.mensagemErro, 'danger');
    }
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
}
