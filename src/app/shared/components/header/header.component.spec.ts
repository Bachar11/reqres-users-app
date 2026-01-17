import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('Header', () => {
  let component: Headers;
  let fixture: ComponentFixture<Headers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
