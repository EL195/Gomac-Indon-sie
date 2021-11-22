import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransfertPage } from './transfert.page';

describe('TransfertPage', () => {
  let component: TransfertPage;
  let fixture: ComponentFixture<TransfertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
