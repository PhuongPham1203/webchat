import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFriendComponent } from './item-friend.component';

describe('ItemFriendComponent', () => {
  let component: ItemFriendComponent;
  let fixture: ComponentFixture<ItemFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
