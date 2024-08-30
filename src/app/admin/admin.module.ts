import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMessagesComponent } from './log-messages/log-messages.component';
import { UsersComponent } from './users/users.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxHtmlEditorModule, DxLoadIndicatorModule, DxPopupModule, DxSwitchModule } from 'devextreme-angular';
import { NotificationsComponent } from './notifications/notifications.component';
import { NewsletterSupscriptionComponent } from './subscriptions/newsletter-supscription/newsletter-supscription.component';
import { PrayerTeamSubscriptionComponent } from './subscriptions/prayer-team-subscription/prayer-team-subscription.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { PodCastsComponent } from './media/pod-casts/pod-casts.component';
import { BlogPostsComponent } from './media/blog-posts/blog-posts.component';
import { MediaComponent } from './media/media.component';
import { CouponManagerComponent } from './coupon-manager/coupon-manager.component';
import { WebConfigManagerComponent } from './web-config-manager/web-config-manager.component';


@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxSwitchModule
  ],
  declarations: [
    LogMessagesComponent,
    UsersComponent,
    NotificationsComponent,
    NewsletterSupscriptionComponent,
    PrayerTeamSubscriptionComponent,
    SubscriptionsComponent,
    MediaComponent,
    PodCastsComponent,
    BlogPostsComponent,
    CouponManagerComponent,
    WebConfigManagerComponent
  ]
})
export class AdminModule { }
