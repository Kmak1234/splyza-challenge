import { Component, OnDestroy, OnInit } from '@angular/core';
import { Videos } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video-service/video.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-video-main',
  templateUrl: './video-main.component.html',
  styleUrls: ['./video-main.component.css']
})
export class VideoMainComponent implements OnInit, OnDestroy {
  viewChange = [ 
    { view: 'grid', icon: 'apps', active: true }, // First icon
    { view: 'list', icon: 'list', active: false } // Second icon
  ];

  constructor(private videoService: VideoService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started to', event.url);
      }
    });
  }

  viewMode: any;
  allVideo: Videos[] = [];
  subscriptions: Subscription[] = [];

  activeView = 'grid';

  toggleView(view: 'grid' | 'list') {
    this.activeView = view;
  }

  ngOnInit(): void {
    this.onGetView();
    this.getAllVideos();
  }

  getAllVideos() {
    this.subscriptions.push(
      this.videoService.getAllVideos().subscribe({
        next: (video) => {
          this.allVideo = video;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })
    )
  }

  onGetView() {
    this.viewMode = this.viewChange.find(viewModeList => viewModeList.view === this.activeView);
  }

  

  onDetailVideo(videoId: any) {
    this.router.navigate(['/detail-video', videoId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}