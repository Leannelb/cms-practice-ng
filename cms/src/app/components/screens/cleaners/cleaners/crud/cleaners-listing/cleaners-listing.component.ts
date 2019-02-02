import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobModel } from 'src/app/models/JobModel';
// import { JobModel } from '../../../../../models/JobModel';

@Component({
  selector: 'cleaners-listing',
  templateUrl: './cleaners-listing.component.html'
})
export class CleanersListingComponent implements OnInit {

  public cleaners:JobModel[];
  public siteRef:string;

  constructor(
    protected activeRoute:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
      this.siteRef = params['siteRef'];
      this.getCleaners();
      // response
    });
  }
  
  private getCleaners(){
    // this.cleanerservice.getCleaners(this.siteRef).subscribe((cleaners)=>{
    //   this.cleaners = cleaners;
    // });
  }

  private removeJob(ref)
  {
    // this.cleanerservice.removeJob(ref).subscribe((cleaners)=>{
    //   this.getCleaners();
    // });
  }
}
