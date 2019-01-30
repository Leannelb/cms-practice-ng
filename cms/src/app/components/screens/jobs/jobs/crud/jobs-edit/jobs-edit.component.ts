import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertyModel } from '../../../../../models/PropertyModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PagesService } from '../../pages.service';
import { PageModel } from '../../../../../models/PageModel';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page:PageModel;
  pageRef:string;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Add content of your page here',
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
    private pagesService: PagesService, 
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pageRef = params['pageRef'];
      if(this.pageRef != null){
        this.pagesService.getPage(this.pageRef).subscribe(page=>{
          this.page = page;
          this.updateFormValues(page);
        });
      }
    });
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
        ref: this.pageRef,
        image:this.form.value.image
      };

      this.pagesService.updatePage(post).subscribe((response) => {
        this.router.navigate(['/pages/listing',this.page.site_ref]);
      }, (error) => {});
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

  protected updateFormValues(response:PageModel) {
    this.form.get('title').setValue(response.title);
    this.form.get('htmlContent').setValue(response.content);
    this.form.get('status').setValue(response.status);
    this.form.get('slug').setValue(response.slug);
    this.form.get('meta_keywords').setValue(response.meta_keywords);
    this.form.get('meta_description').setValue(response.meta_description);
  }

}
 