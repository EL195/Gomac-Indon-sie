import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersProductsPage } from './orders-products.page';

describe('OrdersProductsPage', () => {
  let component: OrdersProductsPage;
  let fixture: ComponentFixture<OrdersProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
