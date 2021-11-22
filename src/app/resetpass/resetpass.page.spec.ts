import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetpassPage } from './resetpass.page';

describe('ResetpassPage', () => {
  let component: ResetpassPage;
  let fixture: ComponentFixture<ResetpassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
