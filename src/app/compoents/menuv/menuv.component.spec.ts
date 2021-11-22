import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuvComponent } from './menuv.component';

describe('MenuvComponent', () => {
  let component: MenuvComponent;
  let fixture: ComponentFixture<MenuvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuvComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
