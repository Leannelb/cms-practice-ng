import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SiteModel } from '../../../../models/SiteModel';
import { SitesService, CreateUpdateSiteRequestBody } from '../sites.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit {

  form:FormGroup;
  ref:string;

  constructor(private cd: ChangeDetectorRef,
    private activatedLink:ActivatedRoute,
    private router:Router,
    private siteService:SitesService) { }

  ngOnInit() {

    this.activatedLink.params.subscribe((params)=>{
      this.ref = params['ref'];
      console.log("REF: "+this.ref);
      this.getSite(this.ref);
    });

    this.form =  new FormGroup({
      name    : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      domain    : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
   });
   
  }

  private getSite(ref:string){
    this.siteService.getSite(this.ref).subscribe((site)=>{
      this.form.get("name").setValue(site.name);
      this.form.get("domain").setValue(site.domain);
    });
  }


  onFormSubmit(): void{
    let post:CreateUpdateSiteRequestBody = {
      name:this.form.get('name').value,
      domain:this.form.get('domain').value,
      ref:this.ref
    };

    this.siteService.updateSite(post).subscribe((response)=>{
      if(response.status == 1){
        this.router.navigate(['/sites/listing/',response.data["client_ref"]]);
      }else{
        if(response.message != null){
          alert(response.message);
        }
      }
    });
 }
  

}
