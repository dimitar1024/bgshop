import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableViewComponent } from './product-table-view.component';

describe('ProductTableViewComponent', () => {
  let component: ProductTableViewComponent;
  let fixture: ComponentFixture<ProductTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
