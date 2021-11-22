import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyageAddPage } from './voyage-add.page';

describe('VoyageAddPage', () => {
  let component: VoyageAddPage;
  let fixture: ComponentFixture<VoyageAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyageAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
