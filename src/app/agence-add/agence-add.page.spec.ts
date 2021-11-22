import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgenceAddPage } from './agence-add.page';

describe('AgenceAddPage', () => {
  let component: AgenceAddPage;
  let fixture: ComponentFixture<AgenceAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenceAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgenceAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
