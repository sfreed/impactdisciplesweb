import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { WebConfigService } from 'impactdisciplescommon/src/services/utils/web-config.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FileImportService } from 'impactdisciplescommon/src/services/utils/file-import.service';
import { TaxRateService } from 'impactdisciplescommon/src/services/utils/tax-rate.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { Timestamp } from 'firebase/firestore';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { TaxRate } from 'impactdisciplescommon/src/models/utils/tax-rate.model';

@Component({
  selector: 'app-web-config',
  templateUrl: './web-config.component.html',
  styleUrls: ['./web-config.component.css']
})
export class WebConfigComponent implements OnInit{
  datasource$: Observable<DataSource>;

  public isVisible$ = new BehaviorSubject<boolean>(false);

  selectedItem: WebConfigModel;

  spinnerVisible: boolean = true;

  itemType = 'Web Configuration';

  files: File[] = [];

  showImportButton: boolean = false;

  loadingVisible = false;

  constructor(private service: WebConfigService,
    private toastr:ToastrService,
    private fileImportService: FileImportService<TaxRate>,
    private taxRateService: TaxRateService) {}

  async ngOnInit() {
    this.datasource$ = this.taxRateService.streamAll().pipe(
      map(
        (items) =>
          new DataSource({
            reshapeOnPush: true,
            pushAggregationTimeout: 100,
            store: new CustomStore({
              key: 'id',
              loadMode: 'raw',
              load: function (loadOptions: any) {
                return items;
              }
            })
          })
      )
    );

    this.selectedItem = await this.service.getAll().then(config => {
      this.spinnerVisible = false;

      if(config && config.length == 1){
        return config[0];
      } else {
        return {...new WebConfigModel()};
      }
    });
  }

  save = async () => {
    this.spinnerVisible = true;

    if(this.selectedItem.id){
      this.selectedItem = await this.service.update(this.selectedItem.id, {... this.selectedItem});
    } else {
      this.selectedItem = await this.service.add({... this.selectedItem});
    }
    this.toastr.success("Configuration Saved Successfully!");

    this.spinnerVisible = false;
  }

  async importTaxForm(){
    this.loadingVisible = true;

    await this.fileImportService.importFiles(this.files).then(async rates => {
      let promises = [];
      rates.forEach(async rate => {
        promises.push(this.taxRateService.add(rate));
      })
      return promises;
    }).then(promises => {
      Promise.all(promises).then(async () => {
        this.selectedItem.taxImportDate = Timestamp.now();
        this.selectedItem = await this.service.update(this.selectedItem.id, this.selectedItem);
        this.toastr.success("Tax Rates Imported Successfully!");
        this.loadingVisible = false;
      })
    })
  }

  onFileUploaded(file: File){
    this.files.push(file);
    this.showImportButton = true;
  }

  getLastImportedDate(){
    if(this.selectedItem.taxImportDate){


      return (dateFromTimestamp(this.selectedItem.taxImportDate as Timestamp) as Date).toDateString();
    } else {
      return '';
    }
  }
}
