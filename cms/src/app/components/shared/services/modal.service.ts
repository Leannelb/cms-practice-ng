import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { PropertyReviewModel } from '../../../models/PropertyReviewModel';
import { PropertyLocationModel } from 'src/app/models/PropertyLocationModel';
import { PropertyBookingModel } from 'src/app/models/PropertyBookingModel';
import { TownModel } from 'src/app/models/TownModel';
import { CalendarDay } from '../../partials/calendar/calendar.component';


@Injectable()
export class ModalService {
  public showAlertModalSubject:Subject<ShowAlertModalRequest>;

  public showPropertyGallerySubject:Subject<ShowPropertyGalleryModal>;
  public showPropertyReviewSubject:Subject<PropertyReviewModel>;
  public showPropertyLocationSubject:Subject<PropertyLocationModel>;
  public showPropertyBookingSubject:BehaviorSubject<PropertyBookingModel>;
  
  public showBookingSelectionSubject:Subject<CalendarDay>;

  public showClientTownSubject:Subject<TownModel>;

  constructor() {
    this.showAlertModalSubject              = new Subject<ShowAlertModalRequest>();
    this.showPropertyGallerySubject         = new Subject<ShowPropertyGalleryModal>();
    this.showPropertyReviewSubject          = new Subject<PropertyReviewModel>();
    this.showPropertyLocationSubject        = new Subject<PropertyLocationModel>();
    this.showPropertyBookingSubject         = new BehaviorSubject<PropertyBookingModel>(null);
    this.showClientTownSubject              = new Subject<TownModel>();
    this.showBookingSelectionSubject        = new Subject<CalendarDay>();
  }

}

export interface ShowPropertyGalleryModal{
  propertyRef:string
  image_id?:string|null;
  position:number;
}

// export interface ShowPropertyReviewModal{
//   propertyRef:string
//   image_id?:string|null;
//   position:number;
// }

export interface ShowAlertModalRequest{
  title?:string|"Information";
  modalType?:string|'information';
  messages:string[];
}
