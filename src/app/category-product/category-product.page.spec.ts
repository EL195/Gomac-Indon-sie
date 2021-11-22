import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryProductPage } from './category-product.page';

describe('CategoryProductPage', () => {
  let component: CategoryProductPage;
  let fixture: ComponentFixture<CategoryProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
