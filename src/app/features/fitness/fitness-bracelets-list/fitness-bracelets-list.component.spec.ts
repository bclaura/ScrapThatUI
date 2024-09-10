import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessBraceletsListComponent } from './fitness-bracelets-list.component';

describe('FitnessBraceletsListComponent', () => {
  let component: FitnessBraceletsListComponent;
  let fixture: ComponentFixture<FitnessBraceletsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessBraceletsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessBraceletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
