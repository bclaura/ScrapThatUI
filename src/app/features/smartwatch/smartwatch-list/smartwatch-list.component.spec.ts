import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartwatchListComponent } from './smartwatch-list.component';

describe('SmartwatchListComponent', () => {
  let component: SmartwatchListComponent;
  let fixture: ComponentFixture<SmartwatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartwatchListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmartwatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
