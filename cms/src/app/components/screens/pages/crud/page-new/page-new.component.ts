import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageModel } from '../../../../../models/PageModel';
import { PagesService } from '../../pages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  
  protected pagePost: PageModel;
  private siteRef:string;
  
  
  name = 'Angular6 Editor';
  htmlContent = 'this is some wicked text ';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Add content of your page here',
    translate: 'no',
  };

  public form = new FormGroup({
    title       : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    status      : new FormControl([], [Validators.required]),
    image       : new FormControl('',),
    meta_keywords       : new FormControl('',),
    meta_description       : new FormControl('',),
    htmlContent : new FormControl('', [Validators.maxLength(64000), Validators.required])
  });


  constructor(private pageService:PagesService,protected activatedRoute:ActivatedRoute,protected router:Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      this.siteRef = params['siteRef'];
    })
  }

  public createPage(post: PageModel) {
    return this.pageService.createPage(post).subscribe(response => {
      // alert('ok');
      this.router.navigate(['/pages/listing',this.siteRef]);
      console.log(response);
    },
      error => {
      // alert('error');
        console.log(error);
      });
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

  public onFormSubmit() {
    console.warn(this.form.value);
    // console.log(this.formControlName);
    // alert('on form submit trigered');
    // alert(this.form.value.status_id);
    const post = {
      title     : this.form.value.title,
      content   : this.form.value.htmlContent,
      status_id : this.form.value.status_id,
      image     : this.form.value.image,
      meta_keywords     : this.form.value.meta_keywords,
      meta_description     : this.form.value.meta_description,
      site_ref   : this.siteRef
    };

    return this.createPage(post);
  }
}
