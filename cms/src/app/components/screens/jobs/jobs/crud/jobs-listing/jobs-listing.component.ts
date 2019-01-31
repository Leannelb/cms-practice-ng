import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../jobs.service';
import { JobModel } from 'src/app/models/JobModel';
// import { JobModel } from '../../../../../models/JobModel';

@Component({
  selector: 'job-listing',
  templateUrl: './job-listing.component.html'
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
    // this.jobService.getJobs(this.siteRef).subscribe((jobs)=>{
    //   this.jobs = jobs;
    // });
  }

  private removeJob(ref)
  {
    // this.jobService.removeJob(ref).subscribe((jobs)=>{
    //   this.getJobs();
    // });
  }
}
