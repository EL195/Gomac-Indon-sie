import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyageEditPage } from './voyage-edit.page';

describe('VoyageEditPage', () => {
  let component: VoyageEditPage;
  let fixture: ComponentFixture<VoyageEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyageEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
