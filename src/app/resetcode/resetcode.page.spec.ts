import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetcodePage } from './resetcode.page';

describe('ResetcodePage', () => {
  let component: ResetcodePage;
  let fixture: ComponentFixture<ResetcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
