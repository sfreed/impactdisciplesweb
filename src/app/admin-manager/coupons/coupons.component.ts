import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { CouponModel } from 'impactdisciplescommon/src/models/utils/coupon.model';
import { CouponService } from 'impactdisciplescommon/src/services/utils/coupon.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';
import { EventService } from 'impactdisciplescommon/src/services/event.service';
import { AffilliateSalesService } from 'impactdisciplescommon/src/services/utils/affiliate-sales.service';
import { dateFromTimestamp } from 'impactdisciplescommon/src/utils/date-from-timestamp';
import { AffilliateSaleModel } from 'impactdisciplescommon/src/models/utils/affilliate-sale.model';
import { Timestamp } from 'firebase/firestore';
import { AffilliatePaymentsService } from 'impactdisciplescommon/src/services/utils/affiliate-payment.service';
import { AffilliatePaymentModel } from 'impactdisciplescommon/src/models/utils/affilliate-payment.model';
import { TagModel } from 'impactdisciplescommon/src/models/domain/tag.model';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit{
  @ViewChild('addEditForm', { static: false }) addEditForm: DxFormComponent;

  datasource$: Observable<DataSource>;
  selectedItem: CouponModel;

  itemType = 'Coupon';

  public inProgress$ = new BehaviorSubject<boolean>(false)
  public isVisible$ = new BehaviorSubject<boolean>(false);

  eventTags: TagModel[] = [];
  affilliateSales: Observable<AffilliateSaleModel[]>;
  affilliatePayments: Observable<AffilliatePaymentModel[]>;

  selectedRows: AffilliateSaleModel[] = [];

  constructor(private service: CouponService,
    private eventService: EventService,
    private affiliateSalesService: AffilliateSalesService,
    private affilliatePaymentService: AffilliatePaymentsService) {}

  ngOnInit() {
    this.datasource$ = this.service.streamAll().pipe(
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

    this.eventService.streamAll().subscribe(events => {
      events.forEach(event => this.eventTags.push({id: event.id, tag: event.eventName}));
      return events;
    });
  }

  showEditModal = async ({ row: { data } }) => {
    this.selectedItem = (Object.assign({}, data));

    this.isVisible$.next(true);

    this.affilliateSales = await this.affiliateSalesService.streamAllByValue("code", this.selectedItem.code).pipe(
      map(sales => {
        sales.forEach(sale => sale.date = dateFromTimestamp(sale.date as Timestamp))
        return sales;
      })
    );

    this.affilliatePayments = await this.affilliatePaymentService.streamAllByValue("code", this.selectedItem.code).pipe(
      map(payments => {
        payments.forEach(payment => payment.date = dateFromTimestamp(payment.date as Timestamp))
        return payments;
      })
    );
  }

  showAddModal = () => {
    this.selectedItem = {... new CouponModel()};

    this.isVisible$.next(true);
  }

  pay = async () => {
    if(this.selectedRows.length == 0){
      notify({
        message: 'No Sales Selected to pay!',
        position: 'top',
        width: 600,
        type: 'warning'
      });
    }  else if(this.selectedRows.find(x => x.isPayed == true)){
      notify({
        message: 'The selected Sales include already payed!',
        position: 'top',
        width: 600,
        type: 'warning'
      });
    } else {
      let sum: number = this.selectedRows.map(row => row.totalBeforeDiscount - row.totalAfterDiscount).reduce((a,b) => a + b, 0);
      let ids: string[] = this.selectedRows.map(row => row.id)

      await this.affilliatePaymentService.pay(this.selectedItem.affiliatePaypalAccount, sum).then(async response => {
        //  create payment record
        let payment: AffilliatePaymentModel = {... new AffilliatePaymentModel()}
        payment.code = this.selectedItem.code;
        payment.date = Timestamp.now();
        payment.amountPayed = sum;
        payment.saleIdsPayed = ids;
        payment.receipt = response;

        payment = await this.affilliatePaymentService.add(payment);

        //  update sales record
        this.selectedRows.forEach(async row => {
          row.isPayed = true;
          row.paymentReceipt = payment.id;
          row.amountPayed = row.totalBeforeDiscount - row.totalAfterDiscount;

          await this.affiliateSalesService.update(row.id, row);
        })
      })

      notify({
        message: 'All Sales Paid!',
        position: 'top',
        width: 600,
        type: 'success'
      });
    }
  }

  delete = ({ row: { data } }) => {
    confirm('<i>Are you sure you want to delete this record?</i>', 'Confirm').then((dialogResult) => {
      if (dialogResult) {
        this.service.delete(data.id).then(() => {
          notify({
            message: this.itemType + ' Deleted',
            position: 'top',
            width: 600,
            type: 'success'
          });
        })
      }
    });
  }

  onSave(item: CouponModel) {
    if(this.addEditForm.instance.validate().isValid) {
      this.inProgress$.next(true);
      if(item.id) {
        this.service.update(item.id, item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Updated',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'success'
            });
          }
        })
      } else {
        this.service.add(item).then((item) => {
          if(item) {
            notify({
              message: this.itemType + ' Added',
              position: 'top',
              width: 600,
              type: 'success'
            });
            this.onCancel();
          } else {
            this.inProgress$.next(false);
            notify({
              message: 'Some Error Occured',
              position: 'top',
              width: 600,
              type: 'error'
            });
          }
        })
      }
    }
  }

  onCancel() {
    this.selectedItem = null;
    this.inProgress$.next(false);
    this.isVisible$.next(false);
  }

  formatDate(time: number){
    return (dateFromTimestamp(time) as Date).toDateString();
  }
}
