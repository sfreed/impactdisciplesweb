import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { WebConfigService } from 'impactdisciplescommon/src/services/utils/web-config.service';

@Component({
  selector: 'app-web-config',
  templateUrl: './web-config.component.html',
  styleUrls: ['./web-config.component.css']
})
export class WebConfigComponent implements OnInit{
  selectedItem: WebConfigModel;

  spinnerVisible: boolean = true;

  itemType = 'Web Configuration';

  constructor(private service: WebConfigService, private toastr:ToastrService) {}

  async ngOnInit() {
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
}
