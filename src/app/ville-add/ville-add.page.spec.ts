import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VilleAddPage } from './ville-add.page';

describe('VilleAddPage', () => {
  let component: VilleAddPage;
  let fixture: ComponentFixture<VilleAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VilleAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VilleAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
