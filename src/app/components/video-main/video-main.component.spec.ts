import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMainComponent } from './video-main.component';

describe('VideoMainComponent', () => {
  let component: VideoMainComponent;
  let fixture: ComponentFixture<VideoMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoMainComponent]
    });
    fixture = TestBed.createComponent(VideoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
