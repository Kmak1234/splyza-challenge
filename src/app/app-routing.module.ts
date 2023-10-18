import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoMainComponent } from './components/video-main/video-main.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'video', pathMatch: 'full'},
  { path: 'video', component: VideoMainComponent },
  { path: 'detail-video/:videoId', component: VideoDetailsComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
