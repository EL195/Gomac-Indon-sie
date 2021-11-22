import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListusersPage } from './listusers.page';

describe('ListusersPage', () => {
  let component: ListusersPage;
  let fixture: ComponentFixture<ListusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListusersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
