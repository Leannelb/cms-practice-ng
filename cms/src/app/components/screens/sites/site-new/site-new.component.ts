import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SiteModel } from '../../../../models/SiteModel';
import { SitesService, CreateUpdateSiteRequestBody } from '../sites.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-site-new',
  templateUrl: './site-new.component.html',
  styleUrls: ['./site-new.component.css']
})
export class SiteNewComponent implements OnInit {

  form :FormGroup;

  ref:string;

  sites:SiteModel[];

  constructor(private cd: ChangeDetectorRef,
    private siteService:SitesService,
    private activatedLink:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {

    this.activatedLink.params.subscribe((params)=>{
      this.ref = params['ref'];
      console.log("REF: "+this.ref);
    });

    this.form =  new FormGroup({
       name    : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
       domain    : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
    });

  }


  

  onFormSubmit(): void{
    
    console.log(this.ref);

    let item:CreateUpdateSiteRequestBody = {
      name: this.form.get("name").value,
      domain: this.form.get("domain").value,
      client_ref: this.ref
    }

    this.siteService.createSite(item).subscribe((response)=>{
      if(response.status==1)
      {
        this.router.navigate(['/sites/listing/',response.data["client_ref"]]);
      } else {
        console.log("Not cool");
      }
    });

  }

}
