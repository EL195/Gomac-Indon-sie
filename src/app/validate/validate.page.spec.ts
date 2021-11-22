import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidatePage } from './validate.page';

describe('ValidatePage', () => {
  let component: ValidatePage;
  let fixture: ComponentFixture<ValidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
