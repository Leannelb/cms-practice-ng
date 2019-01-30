import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListingComponent } from './site-listing.component';

describe('SiteListingComponent', () => {
  let component: SiteListingComponent;
  let fixture: ComponentFixture<SiteListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
