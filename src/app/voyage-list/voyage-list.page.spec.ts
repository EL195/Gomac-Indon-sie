import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyageListPage } from './voyage-list.page';

describe('VoyageListPage', () => {
  let component: VoyageListPage;
  let fixture: ComponentFixture<VoyageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
