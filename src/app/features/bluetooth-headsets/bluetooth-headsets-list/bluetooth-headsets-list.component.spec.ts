import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BluetoothHeadsetsListComponent } from './bluetooth-headsets-list.component';

describe('BluetoothHeadsetsListComponent', () => {
  let component: BluetoothHeadsetsListComponent;
  let fixture: ComponentFixture<BluetoothHeadsetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BluetoothHeadsetsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BluetoothHeadsetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
