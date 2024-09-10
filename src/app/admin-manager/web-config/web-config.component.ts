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
  public dataSource: WebConfigModel;
  spinnerVisible: boolean = true;

  constructor(private service: WebConfigService, private toastr:ToastrService) {}

  async ngOnInit() {
    this.dataSource = await this.service.getAll().then(config => {
      this.spinnerVisible = false;
      if(config && config.length == 1){
        return config[0];
      } else {
        return new WebConfigModel();
      }
    });
  }

  async save() {
    this.spinnerVisible = true;
    if(this.dataSource.id){
      this.dataSource = await this.service.update(this.dataSource.id, {... this.dataSource});
    } else {
      this.dataSource = await this.service.add({... this.dataSource});
    }
    this.toastr.success("Configuration Saved Successfully!");

    this.spinnerVisible = false;
  }
}
