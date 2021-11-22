import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidateVoyagePage } from './validate-voyage.page';

describe('ValidateVoyagePage', () => {
  let component: ValidateVoyagePage;
  let fixture: ComponentFixture<ValidateVoyagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateVoyagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateVoyagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
