import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../jobs.service';
import { PageModel } from '../../../../../models/PageModel';

@Component({
  selector: 'page-listing',
  templateUrl: './page-listing.component.html'
})
export class JobListingComponent implements OnInit {

  public jobs:JobModel[];
  public siteRef:string;

  constructor(
    protected activeRoute:ActivatedRoute,
    protected jobService:JobsService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
      this.siteRef = params['siteRef'];
      this.getJobs();
      // response
    });
  }
  
  private getJobs(){
    this.jobService.getJobs(this.siteRef).subscribe((jobs)=>{
      this.jobs = jobs;
    });
  }

  private removeJob(ref)
  {
    this.jobService.removeJob(ref).subscribe((jobs)=>{
      this.getJobs();
    });
  }
}
