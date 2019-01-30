import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNewComponent } from './site-new.component';

describe('SiteNewComponent', () => {
  let component: SiteNewComponent;
  let fixture: ComponentFixture<SiteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
