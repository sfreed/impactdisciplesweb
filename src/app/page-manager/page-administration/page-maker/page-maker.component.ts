import { Component, Input, NgZone, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Page } from '../../common/models/editor/page.model';
import { CardService } from '../../common/services/card.service';
import { FormService } from '../../common/services/forms.service';
import { PageService } from '../../common/services/page.service';

@Component({
  selector: 'app-page-maker',
  templateUrl: './page-maker.component.html'
})
export class PageMakerComponent implements OnInit {

  @Input('page') page: Page;

  @Input('mode') mode: string;

  dataSource: any = {};

  formSource: any = {};

  imageSelectVisible = false;
  confirmPageSaveVisible = false;
  confirmPageCancelVisible = false

  textEditorVisible = false;

  htmlContent: string;

  editedPage: Page;

  editedField: string;

  constructor(public pageService: PageService,
    public cardService: CardService,
    public formService: FormService,
    private route: ActivatedRoute,
    public ngZone: NgZone,
    public router: Router,) {
    this.onReorder = this.onReorder.bind(this);

    this.dataSource = new CustomStore({
      key: "id",
      loadMode: "raw",
      load: function (loadOptions: any) {
        return cardService.getAll()
      }
    });

    this.formSource = new CustomStore({
      key: "id",
      loadMode: "raw",
      load: function (loadOptions: any) {
        return formService.getAll();
      }
    });
  }

  ngOnInit(): void {

    this.route.params.pipe(take(1)).subscribe(queryParams => {
      if(queryParams['id'] != null){
        this.pageService.getById(queryParams['id']).then(p => {
          this.page = p;
          this.page.dbId = queryParams['id'];
          this.mode = 'edit';
        });
      } else {
        this.mode = 'new';
        this.page = { ...new Page()};
      }
    },err => console.error('Error in Page Maker Admin', err));

  }

  addCard(card){
    this.page.cards.push(card);
  }
  addForm(form) {
    this.page.cards.push(form);
  }

  returnToPageAdministrator(){
    this.ngZone.run(() => {
      this.router.navigate(['/pages/page-administration']);
    });
  }

  displayPageEditor (fieldname, page: Page) {
    this.editedField = fieldname;
    this.editedPage = page;
    this.htmlContent = page[fieldname];

    this.textEditorVisible = true;
  }

  closeEditorWindow(){
    this.textEditorVisible = false;
  }

  displayImageSelection(fieldname: string, page: Page){
    this.editedField = fieldname;
    this.editedPage = page;

    this.imageSelectVisible = true;
  }

  valueChange(value) {
    this.htmlContent = value;
  }

  textEditorClosed(event){
    this.textEditorVisible = event;
  }

  imageSelectClosed(event){
    this.imageSelectVisible = event;
  }

  showSavePopup(){
    this.confirmPageSaveVisible = true;
  }

  showCancelPopup(){
    this.confirmPageCancelVisible = true;
  }

  saveChanges(){
    if(this.page.dbId){
      this.pageService.update(this.page.dbId, this.page);
    } else {
      this.pageService.add(this.page);
    }


    this.returnToPageAdministrator();

    this.closeSaveChanges();
  }

  closeSaveChanges(){
    this.confirmPageSaveVisible = false;
  }

  cancelChanges(){
    this.closeCancelChanges();
    this.returnToPageAdministrator();
  }

  closeCancelChanges(){
    this.confirmPageCancelVisible = false;
  }

  onReorder(e) {
    var visibleRows = e.component.getVisibleRows(),
        toIndex = this.page.cards.indexOf(visibleRows[e.toIndex].data),
        fromIndex = this.page.cards.indexOf(e.itemData);

    this.page.cards.splice(fromIndex, 1);
    this.page.cards.splice(toIndex, 0, e.itemData);
  }
}
