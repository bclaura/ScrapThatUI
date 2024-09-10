import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesListComponent } from './phones-list.component';

describe('PhonesListComponent', () => {
  let component: PhonesListComponent;
  let fixture: ComponentFixture<PhonesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhonesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
