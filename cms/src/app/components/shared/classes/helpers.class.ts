import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class HelperFunctions {

  public static pageTitle(title) {
    var maintitle = "Luxury Villas Malta | Holiday Villas For Rent in Malta";
    if (title) {
      return maintitle + " | " + title;
    }
    return maintitle;

  }

  public static dateToStr(model: NgbDateStruct) {
    if (model != null) {
      return model.year + "-" + model.month + "-" + model.day;
    }
    return null;
  }

  public static validEmail(email: string): string {

    let regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (email == "" || !regex.test(email.toLowerCase())) {
      return null
    } else {
      return email.toLocaleLowerCase();
    }
  }

  public static getCurrentUnixTime(stripTime = true): number {
    let unixTime = Math.round(new Date().getTime() / 1000);//mili to sec
    return stripTime ? HelperFunctions.stripTimeFromUnixTime(unixTime) : unixTime;

  }

  public static unixDateToJS(unixTime: number): Date {
    return new Date(unixTime * 1000);
  }

  public static unixYear(unixTime: number): number {
    let date = this.unixDateToJS(unixTime);
    return date.getFullYear();
  }

  public static unixDay(unixTime: number): number {
    let date = this.unixDateToJS(unixTime);
    return date.getDate();
  }

  public static unixMonth(unixTime: number): number {
    let date = this.unixDateToJS(unixTime);
    return date.getMonth() + 1;
  }

  public static ngbDateToUnixTime(date: NgbDateStruct, stripTime: boolean = true): number {
    if (date != null) {
      let jsDate = new Date(date.year, date.month - 1, date.day + 1);
      let unixTime = Math.round(jsDate.getTime() / 1000);//mili to sec
      return stripTime ? HelperFunctions.stripTimeFromUnixTime(unixTime) : unixTime;
    }
    return null;
  }

  public static stripTimeFromUnixTime(time: number): number {
    return Math.floor(time / 86400) * 86400;
  }

  public static isEmptyObject(obj:any){
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

}