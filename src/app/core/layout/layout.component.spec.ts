import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
