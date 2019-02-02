import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { JobModel } from 'src/app/models/JobModel';

@Component({
  selector: 'cleaners-edit',
  templateUrl: './cleaners-edit.component.html'
})
export class CleanersEditComponent implements OnInit {
  job:JobModel;
  jobRef:string;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Add content of your job here',
    translate: 'no',
  };


  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    status: new FormControl('', [Validators.required]),
    slug: new FormControl(''),
    htmlContent: new FormControl('', [Validators.required]),
    image:new FormControl('',[Validators.nullValidator]),
    meta_keywords      : new FormControl(),
    meta_description      : new FormControl(),
  });

  constructor(
    protected route: ActivatedRoute, 
    // private cleanersService: CleanersService, 
    private router: Router) { }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   this.jobRef = params['jobRef'];
    //   if(this.jobRef != null){
    //     this.cleanersService.getJob(this.jobRef).subscribe(job=>{
    //       this.job = job;
    //       this.updateFormValues(job);
    //     });
    //   }
    // });
  }

  public onFormSubmit(event) {
    // alert([this.form.controls['name'].dirty || this.form.controls['name']. touched, this.form.controls['name'].dirty, this.form.controls['name'].touched]);
    if(this.form.valid){
      const post = {
        title: this.form.value.title,
        content: this.form.value.htmlContent,
        status: this.form.value.status,
        slug: this.form.value.slug,
        meta_keywords: this.form.value.meta_keywords,
        meta_description: this.form.value.meta_description,
        ref: this.jobRef,
        image:this.form.value.image
      };

      // this.cleanersService.updateJob(post).subscribe((response) => {
      //   this.router.navigate(['/cleaners/listing',this.job.site_ref]);
      // }, (error) => {});
    }
  }

  public onFileChange(event,imageType:string){
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
  
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {//loop should iterate only once has we only have one file not multi
      let file = files[i];
      this.form.get(imageType).setValue(file);
      // formData.append('file', file);
    }
    
  }

  // protected updateFormValues(response:jobModel) {
  //   this.form.get('title').setValue(response.title);
  //   this.form.get('htmlContent').setValue(response.content);
  //   this.form.get('status').setValue(response.status);
  //   this.form.get('slug').setValue(response.slug);
  //   this.form.get('meta_keywords').setValue(response.meta_keywords);
  //   this.form.get('meta_description').setValue(response.meta_description);
  // }

}
 