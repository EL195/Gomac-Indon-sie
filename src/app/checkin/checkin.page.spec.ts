import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckinPage } from './checkin.page';

describe('CheckinPage', () => {
  let component: CheckinPage;
  let fixture: ComponentFixture<CheckinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
