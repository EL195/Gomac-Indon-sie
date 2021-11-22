import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloquePage } from './bloque.page';

describe('BloquePage', () => {
  let component: BloquePage;
  let fixture: ComponentFixture<BloquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
