import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatPage } from './plat.page';

describe('PlatPage', () => {
  let component: PlatPage;
  let fixture: ComponentFixture<PlatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
