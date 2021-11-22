import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopProductPage } from './shop-product.page';

describe('ShopProductPage', () => {
  let component: ShopProductPage;
  let fixture: ComponentFixture<ShopProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
