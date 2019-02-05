import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobModel } from 'src/app/models/JobModel';
import { CleanerModel } from 'src/app/models/CleanerModel';
import { CleanersService } from '../../cleaners.service';
// import { JobModel } from '../../../../../models/JobModel';

@Component({
  selector: 'cleaners-listing',
  templateUrl: './cleaners-listing.component.html'
})
export class CleanersListingComponent implements OnInit {

  public cleaners:CleanerModel[];
  public siteRef:string;
  private cleanerservice:CleanersService;

  constructor(
    protected activeRoute:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
      this.getCleaners();
      // response
    });
  }
  
  private getCleaners(){
    this.cleanerservice.getCleaners().subscribe((cleaners)=>{
      this.cleaners = cleaners;
    });
  }

  private removeJob(ref)
  {
    // this.cleanerservice.removeJob(ref).subscribe((cleaners)=>{
    //   this.getCleaners();
    // });
  }
}
