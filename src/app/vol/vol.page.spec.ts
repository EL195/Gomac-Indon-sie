import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolPage } from './vol.page';

describe('VolPage', () => {
  let component: VolPage;
  let fixture: ComponentFixture<VolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
