import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReactionToVideo, Videos } from 'src/app/interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getAllVideos() {
    const getAllVideos = environment.backendUrl + '/api/videos';
    return this.http.get<Videos[]>(getAllVideos);
  }

  getVideoDetailsById(videoId: any) {
    const getVideoDetailsByIdAPI =
      environment.backendUrl + '/api/videos/' + videoId;
    return this.http.get<Videos>(getVideoDetailsByIdAPI);
  }

  getVideoReactionById(videoId: any) {
    const getVideoReactionByIdAPI = `${environment.backendUrl}/api/videos/${videoId}/reactions`;
    return this.http.get<ReactionToVideo[]>(getVideoReactionByIdAPI);
  }

}
