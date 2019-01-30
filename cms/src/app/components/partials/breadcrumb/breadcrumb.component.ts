import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() 
  public title:string;

  @Input() 
  public hasActions:boolean;

  constructor() { }

  ngOnInit() {
  }

}
