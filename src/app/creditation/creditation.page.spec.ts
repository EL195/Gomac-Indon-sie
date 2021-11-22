import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditationPage } from './creditation.page';

describe('CreditationPage', () => {
  let component: CreditationPage;
  let fixture: ComponentFixture<CreditationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
