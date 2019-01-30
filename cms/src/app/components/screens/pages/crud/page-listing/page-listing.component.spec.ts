import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListingComponent } from './page-listing.component';

describe('PageListingComponent', () => {
  let component: PageListingComponent;
  let fixture: ComponentFixture<PageListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
