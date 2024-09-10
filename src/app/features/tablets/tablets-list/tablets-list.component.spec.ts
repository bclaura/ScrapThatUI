import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletsListComponent } from './tablets-list.component';

describe('TabletsListComponent', () => {
  let component: TabletsListComponent;
  let fixture: ComponentFixture<TabletsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
