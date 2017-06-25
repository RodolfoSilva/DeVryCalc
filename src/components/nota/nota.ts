import { Component, Input } from '@angular/core';

@Component({
  selector: 'nota',
  template: `
  <div class="nota" *ngIf="nota !== null" [style.color]="color">{{ nota | number: '1.0-1' }}</div>
  <div class="nota" *ngIf="nota === null">_._</div>
  <h2 class="titulo">{{ titulo }}</h2>
  `
})
export class Nota {
  @Input('titulo') titulo: string;
  @Input('nota') nota: number;
  @Input('media') media: number = 5;
  color: string;
  colors = {
    low: '#f53d3d',
    high: '#32db64'
  };

  ngOnInit() {
    this.color = this.nota >= this.media ?
                    this.colors.high : this.colors.low;
  }
}
