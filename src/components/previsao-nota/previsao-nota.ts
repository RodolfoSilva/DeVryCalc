import { Component, Input } from '@angular/core';
import { ColorForNotes } from '../../enums/colors-for-notes';


@Component({
  selector: 'previsao-nota',
  template: `
  <div *ngIf="nota !== null && nota <= 10" text-center>
    <div ion-text class="nota" color="primary" *ngIf="nota < 0 ">0</div>
    <div ion-text class="nota" color="primary" *ngIf="nota > 0">{{ nota | number: '1.0-1' }}</div>
    <h2 class="titulo">{{ titulo }}</h2>
  </div>
  `
})
export class PrevisaoNota {
  @Input('titulo') titulo: string;
  @Input('nota') nota: number;
  @Input('media') media: number = 5;
  color: string;

  ngOnInit() {
    this.color = this.nota >= this.media ? ColorForNotes.HIGH : ColorForNotes.LOW;
  }
}
