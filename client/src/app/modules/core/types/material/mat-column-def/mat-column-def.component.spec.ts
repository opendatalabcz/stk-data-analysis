import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {MatColumnDefComponent} from './mat-column-def.component';

describe('MatColumnDefComponent', () => {
  let component: MatColumnDefComponent;
  let fixture: ComponentFixture<MatColumnDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatColumnDefComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatColumnDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
