import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopsListComponent } from './laptops-list.component';

describe('LaptopsListComponent', () => {
  let component: LaptopsListComponent;
  let fixture: ComponentFixture<LaptopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaptopsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaptopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
