import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListElementComponent } from './account-list-element.component';

describe('AccountListElementComponent', () => {
  let component: AccountListElementComponent;
  let fixture: ComponentFixture<AccountListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
