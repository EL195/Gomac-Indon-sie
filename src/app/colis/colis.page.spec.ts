import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColisPage } from './colis.page';

describe('ColisPage', () => {
  let component: ColisPage;
  let fixture: ComponentFixture<ColisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
