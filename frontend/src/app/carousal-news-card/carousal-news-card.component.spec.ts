import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousalNewsCardComponent } from './carousal-news-card.component';

describe('CarousalNewsCardComponent', () => {
  let component: CarousalNewsCardComponent;
  let fixture: ComponentFixture<CarousalNewsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarousalNewsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarousalNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
