import { Component, OnInit } from '@angular/core';
import { SiteModel } from '../../../../models/SiteModel';
import { SitesService } from '../sites.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-listing',
  templateUrl: './site-listing.component.html',
  styleUrls: ['./site-listing.component.css']
})
export class SiteListingComponent implements OnInit {

  public sites:Array<SiteModel>;
  ref:string;

  constructor(private siteService: SitesService,
    private activatedLink:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.activatedLink.params.subscribe((params)=>{
      this.ref = params['ref'];
      console.log("REF: "+this.ref);
      this.getSites(this.ref);
    });
  }

  public getSites(ref){
    this.siteService.getSites(ref).subscribe( (sites)=>{
      this.sites = sites;
    });
  }

  public delete(ref:string){
    if (confirm('This will remove selected item. Please confirm')) {
      this.siteService.deleteSite(ref).subscribe( (response)=>{
        this.getSites(this.ref);
      });
    }
  }

}