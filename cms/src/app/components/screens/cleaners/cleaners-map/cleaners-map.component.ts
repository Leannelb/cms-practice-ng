<reference types="@types/googlemaps"/>>
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cleaners-map',
  templateUrl: './cleaners-map.component.html'
})
export class CleanersMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(35.912224, 14.504167),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

  }
  setMapType(e:any,mapTypeId: string) {
    e.preventDefault();
    this.map.setMapTypeId(mapTypeId)    
  }
}
