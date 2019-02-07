import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CleanerModel } from 'src/app/models/CleanerModel';
import { CleanersService } from '../../cleaners.service';

@Component({
  selector: 'cleaners-listing',
  templateUrl: './cleaners-listing.component.html'
})
export class CleanersListingComponent implements OnInit {

  public cleaners:CleanerModel[];
  public siteRef:string;
  private cleanerService:CleanersService;

  constructor(
    protected activeRoute:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getCleaners() ;
  }

  getCleaners() {
    this.cleanerService.getCleaners().subscribe((cleaners) =>{
        this.cleaners = cleaners;
    });
  }

}
