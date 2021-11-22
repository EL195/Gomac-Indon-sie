import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportPage } from './transport.page';

describe('TransportPage', () => {
  let component: TransportPage;
  let fixture: ComponentFixture<TransportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
