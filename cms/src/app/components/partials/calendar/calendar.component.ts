import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { PropertyBookingModel } from 'src/app/models/PropertyBookingModel';

@Component({
  selector: 'jsc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  @Output() public nextMonthPressed:EventEmitter<MonthYear>;
  @Output() public previousMonthPressed:EventEmitter<MonthYear>;
  @Output() public createBookingClicked:EventEmitter<boolean>;
  @Output() public icalExportClicked:EventEmitter<boolean>;
  @Output() public calendarDayClicked:EventEmitter<CalendarDay>;

  private mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  private currentDate:Date;
  public currentMonth:String;
  public currentYear:number;
  private currentMonthNumber:number;
  private today:number;

  public weeks:CalendarWeek[];


  constructor() {
    this.currentDate          = new Date();
    this.previousMonthPressed = new EventEmitter();
    this.nextMonthPressed     = new EventEmitter();
    this.createBookingClicked = new EventEmitter();
    this.icalExportClicked    = new EventEmitter();
    this.calendarDayClicked   = new EventEmitter();
  }

  ngOnInit() {
    this.currentMonthNumber = this.currentDate.getMonth() + 1;
    this.currentMonth = this.mL[this.currentMonthNumber - 1];
    this.currentYear = this.currentDate.getFullYear();

    this.today = this.currentDate.getDate();
    this.weeks = [];
    this.generateCalendarWeeks();
  }

  private generateCalendarWeeks(){
    let daysInMonth                       = this.daysInMonth(this.currentDate);
    let calendarWeeks:CalendarWeek[]      = [];
    
    let currentWeek                 = {days:[],month:this.currentMonthNumber,year:this.currentYear};
    let currentDayOfTheWeek         = 1;
    for(let i = 1;i <= daysInMonth;i++){
      let day:CalendarDay = {dayNumber:i,events:[],dayOfTheWeekNumber:currentDayOfTheWeek,isToDay:false,isReserved:false,isDisabled:false}; 
      currentWeek.days.push(day);

      if(currentDayOfTheWeek == 7 || i == daysInMonth){
        if(i == daysInMonth &&  currentDayOfTheWeek != 7){
          // calendarWeeks.push(currentWeek)

          let nextMonthDay = 1;
          for(let i = currentDayOfTheWeek; i < 7;i++){
            let day:CalendarDay = {dayNumber:nextMonthDay,events:[],dayOfTheWeekNumber:nextMonthDay,isToDay:false,isReserved:false,isDisabled:true};
            currentWeek.days.push(day);
            nextMonthDay++;
          }
          calendarWeeks.push(currentWeek);

        }else{
          calendarWeeks.push(currentWeek);
          currentWeek         =  {days:[],month:this.currentMonthNumber,year:this.currentYear};;
          currentDayOfTheWeek = 1;
        }
      }else{
        currentDayOfTheWeek++;
      }
    }

    this.weeks = calendarWeeks;
  }

  private daysInMonth(anyDateInMonth):number {
    return new Date(anyDateInMonth.getFullYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();
  }



  public nextMonth(){
    this.currentDate.setMonth(this.currentDate.getMonth() + 1); 
    
    if(this.currentMonthNumber >= 12){
      this.currentMonthNumber = 1;
    }else{
      this.currentMonthNumber++;
    }
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.mL[this.currentMonthNumber - 1];
    this.generateCalendarWeeks();

    let monthYear:MonthYear = {monthNumber:this.currentMonthNumber,year:this.currentYear};
    this.nextMonthPressed.emit(monthYear);
  }

  public previousMonth(){
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
     
    if(this.currentMonthNumber <= 1){
      this.currentMonthNumber = 12;
    }else{
      this.currentMonthNumber--;
    }

    this.currentMonth

    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.mL[this.currentMonthNumber - 1];
    this.generateCalendarWeeks();

    let monthYear:MonthYear = {monthNumber:this.currentMonthNumber,year:this.currentYear};
    this.previousMonthPressed.emit(monthYear);
  }

  public createBooking(){
    this.createBookingClicked.emit(true);
  }

  public dayClicked(day:CalendarDay){
    this.calendarDayClicked.emit(day);
  }

  public icalExport(){
    this.icalExportClicked.emit(true);
  }

  public addBookingEvents(bookings:PropertyBookingModel[]){
    for(let week of this.weeks){
      for(let day of week.days){
        let dayNumber = day.dayNumber;
        day.events = bookings.filter((booking)=>{
          let dayStr = `${week.year}-${week.month}-${dayNumber}`;
          return day.isDisabled == false && this.isDateInRange(dayStr,booking.arrival_date,booking.departure_date) 
        });
      }
    }
  }

  public addReservedDays(reservedDays:string[]){
    for(let week of this.weeks){
      for(let day of week.days){
        let dayNumber = day.dayNumber;
        let dayStr = `${week.year}-${week.month}-${dayNumber}`;
        let isDayReserved:boolean = reservedDays.filter((rDay)=> rDay == dayStr).length > 0 ? true : false;
        day.isReserved = isDayReserved;
      }
    }
  }


  private isDateInRange(dateToCheck:string,dateStart:string,dateEnd:string):boolean{
    let minDate     = new Date(dateStart);
    let maxDate     = new Date(dateEnd);
    let currentDate = new Date(dateToCheck) 
    
    if (currentDate >= minDate && currentDate <= maxDate ){
        return true;
    }else{
        return false;
    }

  }

}

export interface CalendarWeek{days:CalendarDay[],month:number,year:number};
export interface CalendarDay{dayNumber:number, dayOfTheWeekNumber:number , events:PropertyBookingModel[] ,dayName?:string,isToDay:boolean,isReserved:boolean,isDisabled:boolean};
export interface MonthYear {monthNumber:number;year:number};