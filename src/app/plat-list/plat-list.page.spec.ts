import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatListPage } from './plat-list.page';

describe('PlatListPage', () => {
  let component: PlatListPage;
  let fixture: ComponentFixture<PlatListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
