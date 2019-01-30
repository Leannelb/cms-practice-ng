import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../pages.service';
import { PageModel } from '../../../../../models/PageModel';

@Component({
  selector: 'page-listing',
  templateUrl: './page-listing.component.html',
  styleUrls: ['./page-listing.component.css']
})
export class PageListingComponent implements OnInit {

  public pages:PageModel[];
  public siteRef:string;

  constructor(
    protected activeRoute:ActivatedRoute,
    protected pageService:PagesService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
      this.siteRef = params['siteRef'];
      this.getPages();
      // response
    });
  }
  
  private getPages(){
    this.pageService.getPages(this.siteRef).subscribe((pages)=>{
      this.pages = pages;
    });
  }

  private removePage(ref)
  {
    this.pageService.removePage(ref).subscribe((pages)=>{
      this.getPages();
    });
  }
}
