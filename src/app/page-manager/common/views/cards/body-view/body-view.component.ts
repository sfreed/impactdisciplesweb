import { Component, Input, OnInit } from '@angular/core';
import { card_type_values } from 'src/app/page-manager/common/lists/card-fields.list';
import { Card, CardComponent, CardRow } from 'src/app/page-manager/common/models/editor/card.model';
import { confirm } from 'devextreme/ui/dialog';

@Component({
  selector: 'app-card-body-view',
  templateUrl: './body-view.html'
})
export class CardBodyViewComponent implements OnInit {
  @Input('card') card: Card;

  @Input('view') view: string = "edit";

  cardTypes: string[] = card_type_values;

  helpVisible = false;


  constructor() {}

  toggleHelp() {
      this.helpVisible = !this.helpVisible;
  }

  ngOnInit(): void {

  }

  addrow = () => {
    this.card.rows.push({ ... new CardRow() });
  }

  deleterow = (row) => {
    confirm('<i>Are you sure you want to delete this row?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.card.rows.splice(row.itemData.id, 1);
      }
    });
  }

  addcard = (row) => {
    console.log(row)
    let retval: CardComponent = {... new CardComponent()};
    retval.span=12
    this.card.rows[row.itemData.id].components.push({...retval});
  }

  deletecard(row: number, card: number){
    confirm('<i>Are you sure you want to delete this component?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.card.rows[row].components.splice(card, 1);
      }
    });
  }

  onListReorder(e){
    const list = this.card.rows.splice(e.fromIndex, 1)[0];
    this.card.rows.splice(e.toIndex, 0, list);
  }

  slide(e, components){
    const list = components.splice(e.fromIndex, 1)[0];
    components.splice(e.toIndex, 0, list);
  }
}
