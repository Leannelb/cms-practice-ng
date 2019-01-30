import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSidebarComponent } from './quick-sidebar.component';

describe('QuickSidebarComponent', () => {
  let component: QuickSidebarComponent;
  let fixture: ComponentFixture<QuickSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
