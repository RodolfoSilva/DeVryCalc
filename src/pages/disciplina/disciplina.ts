import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { NotaValidator } from './../../validators/nota';
import { DisciplinaModel } from './../../models/disciplina.model';
import { Disciplinas } from './../../providers/disciplinas';

@IonicPage()
@Component({
  selector: 'page-disciplina',
  templateUrl: 'disciplina.html'
})
export class DisciplinaPage {
  disciplina: DisciplinaModel;

  disciplinaForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private disciplinasService: Disciplinas
  ) {
    this.disciplina = this.navParams.get('disciplina');

    if (!this.disciplina) {
      this.disciplina = new DisciplinaModel();
    }

    this.disciplinaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      ap1: ['', NotaValidator.isValid],
      ap2: ['', NotaValidator.isValid],
      ap3: ['', NotaValidator.isValid]
    });
  }

  save() {
    this.disciplinasService.save(this.disciplina).then(() => {
      let message: string = `A disciplina "${this.disciplina.titulo}" foi atualizada!`;
      if (this.disciplina.created_at === this.disciplina.updated_at) {
        message = `A disciplina "${this.disciplina.titulo}" foi criada!`;
      }

      const toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });

      toast.present();
      this.navCtrl.pop();
    });
  }

  excluir() {
    const confirm = this.alertCtrl.create({
      title: 'Apagar disciplina',
      message: `Você tem certeza que deseja apagar a disciplina "${this.disciplina.titulo}"?`,
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.disciplinasService.remove(this.disciplina)
              .then(() => {
                const toast = this.toastCtrl.create({
                  message: `A disciplina "${this.disciplina.titulo}" foi excluída!`,
                  duration: 3000
                });

                toast.present();

                this.navCtrl.pop();
              });
          }
        }
      ]
    });
    confirm.present();
  }
}
