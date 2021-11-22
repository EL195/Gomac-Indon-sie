import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgencePage } from './agence.page';

describe('AgencePage', () => {
  let component: AgencePage;
  let fixture: ComponentFixture<AgencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
