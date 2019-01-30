import { AppComponent } from './app.component';
import { NavigationComponent } from './components/partials/navigation/navigation.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { QuickSidebarComponent } from './components/partials/quick-sidebar/quick-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonTemplateModule } from './components/shared/common-template/common-template.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalService } from './components/shared/services/modal.service';
import { AlertModalComponent } from './components/shared/compoments/modals/alert-modal/alert-modal.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/screens/auth/login/login.component';
import { AuthService } from './components/shared/services/auth.service';
import { UserService } from './components/screens/auth/user.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedModule } from './components/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarComponent } from './components/partials/calendar/calendar.component';

// angular WYSIWYG editor.
// import { AngularEditorModule } from '@kolkov/angular-editor';
// import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    FooterComponent,
    QuickSidebarComponent,
    AlertModalComponent,
    LoginComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    CommonTemplateModule,
    NgSelectModule,
    NoopAnimationsModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
    CalendarModule.forRoot({
      provide   : DateAdapter,
      useFactory: adapterFactory
    }),
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    ModalService,
    ToasterService,
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent],
  exports:[
  ]
})
export class AppModule { }
