import { Component, Input } from '@angular/core';
import { Card } from '../../common/models/editor/card.model';

@Component({
  selector: 'app-card-maker',
  templateUrl: './card-maker.component.html'
})
export class CardMakerComponent {
  @Input('card') card: Card;

  @Input('mode') mode: string;

  constructor() {}


}
