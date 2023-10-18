import { Component,OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user-service/user.service';
import { User } from './interfaces/user';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loginUser!: User;
  subscriptions: Subscription[] = [];
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
    ) {
      this.matIconRegistry.addSvgIcon(
        'list',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/buttons/list.svg'),
      )
      .addSvgIcon(
        'apps',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/buttons/apps.svg')
      );
    }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getLoginUser().subscribe(
        {
          next: (userResponse) => {
            if(userResponse) {
              this.loginUser = userResponse;
            }
          },
          error: (error) => {
            console.log("not working", error);
          }
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
