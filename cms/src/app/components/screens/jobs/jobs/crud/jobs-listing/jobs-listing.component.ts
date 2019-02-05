import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../jobs.service';
import { JobModel } from 'src/app/models/JobModel';
// import { JobModel } from '../../../../../models/JobModel';

@Component({
  selector: 'jobs-listing',
  templateUrl: './jobs-listing.component.html'
})
export class JobsListingComponent implements OnInit {

  public jobs:JobModel[];
  public siteRef:string;

  constructor(
    protected activeRoute:ActivatedRoute,
    protected jobService:JobsService
  ) {}

  ngOnInit() {
    // this.activeRoute.params.subscribe((params)=>{
    //   this.siteRef = params['siteRef'];
      this.getJobs();
      // alert(this.getJobs())
      // response
    // });
  }
  
  private getJobs(){
    this.jobService.getJobs().subscribe((jobs)=>{
      this.jobs = jobs;
      // alert(this.jobs)
    });
  }

  private removeJob(ref)
  {
    // this.jobService.removeJob(ref).subscribe((jobs)=>{
    //   this.getJobs();
    // });
  }
}
