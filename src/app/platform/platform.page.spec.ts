import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlatformPage } from './platform.page';

describe('PlatformPage', () => {
  let component: PlatformPage;
  let fixture: ComponentFixture<PlatformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
