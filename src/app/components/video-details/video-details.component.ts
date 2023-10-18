import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';
import { VideoService } from 'src/app/services/video-service/video.service';
import { VideoReaction, User, ReactionToVideo, UpdateExistingPayload  } from 'src/app/interfaces/video';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  
  subscriptions: Subscription[] = [];
  videoDetails: any;
  videoReactionList: ReactionToVideo[] = [];
  loggedInUserDetails: User | null = null;
  videoTitle!: string;
  videoTitleUpdated: boolean = false;

  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('videoId');
      this.getVideoDetailById(videoId);
      this.loggedInUserData();
      this.getReactions(videoId);
    });
  }

  loggedInUserData() {
    this.loggedInUserDetails = this.userService.getActiveUser();
    console.log('loggedinUser', this.loggedInUserDetails);
  }

  getVideoDetailById(videoId: any) {
    if (!videoId) {
      console.log('check')
    }
  
    this.subscriptions.push(
      this.videoService.getVideoDetailsById(videoId).subscribe({
        next: (videoDetail: any) => {
          console.log('Success', videoDetail);
          this.videoDetails = videoDetail;
          this.videoTitle = videoDetail.title;
        },
        error: (error) => {
          console.error('get video detail failed', error);
        },
      })
    );
  }

  getReactions(videoId: any) {
    this.subscriptions.push(
      this.videoService.getVideoReactionById(videoId).subscribe({
        next: (reactionList) => {
          console.log('reactionList', reactionList);
          this.videoReactionList = reactionList.reverse();
        },
        error: (error) => {
          console.error('Video reaction failed', error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}