import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SeriesModel } from 'impactdisciplescommon/src/models/utils/series.model';
import { SeriesService } from 'impactdisciplescommon/src/services/utils/series.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  @Output() seriesSelectClosed = new EventEmitter<boolean>();

  selectedItem: string;

  seriesList: Observable<SeriesModel[]>;

  constructor(private seriesService: SeriesService) { }

  ngOnInit() {
    this.seriesList = this.seriesService.streamAll();
  }

  addToList(e) {
    let series = {...new SeriesModel()};
    series.name = this.selectedItem;
    this.seriesService.add(series).then(() => {
      this.selectedItem = '';
    });
  }

  removeFromList(e){
    this.seriesService.delete(e.itemData.id)
  }

  onClose(){
    this.seriesSelectClosed.emit(false);
  }
}
