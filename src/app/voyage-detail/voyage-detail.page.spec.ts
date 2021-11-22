import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoyageDetailPage } from './voyage-detail.page';

describe('VoyageDetailPage', () => {
  let component: VoyageDetailPage;
  let fixture: ComponentFixture<VoyageDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoyageDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
