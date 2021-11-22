import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyageOwnPage } from './voyage-own.page';

describe('VoyageOwnPage', () => {
  let component: VoyageOwnPage;
  let fixture: ComponentFixture<VoyageOwnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageOwnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyageOwnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
