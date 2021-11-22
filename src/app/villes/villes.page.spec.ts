import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VillesPage } from './villes.page';

describe('VillesPage', () => {
  let component: VillesPage;
  let fixture: ComponentFixture<VillesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VillesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
