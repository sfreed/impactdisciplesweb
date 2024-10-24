import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../common/models/editor/card.model';

@Component({
  selector: 'app-card-previewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.css']
})

export class CardViewerComponent implements OnInit {
  @Input('card') card: Card;
  @Input('mode') mode: string;

  card_line: {} = {};

  constructor() { }

  ngOnInit(): void {
    this.card.rows.forEach(row=>{
      if(row.components){
        row.components.forEach(component => {
          if(component.custom_item && component.custom_item.custom_script){
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = component.custom_item.script_source_file;
            document.getElementById('script_anchor').appendChild(s);
          }
          if(component.custom_item && component.custom_item.custom_script != null){
            var t = document.createElement("script");
            t.type = "text/javascript";
            t.innerText = component.custom_item.custom_script;
            document.getElementById('script_anchor').appendChild(t);
          }
        })
      }
    })
  }
}
