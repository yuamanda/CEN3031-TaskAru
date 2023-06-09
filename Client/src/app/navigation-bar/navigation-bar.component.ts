import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { NotificationService, EventData } from '../notification.service';
import { Router } from '@angular/router'
import { ThemeService } from '../theme.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(private signInService:SignInService, private themeService:ThemeService, private router:Router, private notifService:NotificationService) {}
  signedIn: boolean = false;
  darkMode: boolean = false;
  showBadge: boolean = false;
  notifications: EventData[] = [];

  ngOnInit(): void {
    let jwtHelper: JwtHelperService = new JwtHelperService
    const token = localStorage.getItem('token')
    if(token && !jwtHelper.isTokenExpired(token)) {
      this.signInService.signIn()
      this.signedIn = true
      this.router.navigate(['/home'])
      const email = jwtHelper.decodeToken(token).iss
      this.signInService.setEmail(email)
    }
    else {
      localStorage.removeItem('token')
    }

    this.notifService.eventData$.subscribe((notifications: EventData[]) => {
      setTimeout(() => {
        this.notifications = notifications
        if(this.notifications.length === 0) {
          this.showBadge = false
        }
        else {
          this.showBadge = true
        }
      }, 2000)
    });

    this.signInService.isSignedIn$.subscribe((signInStatus: boolean) => {
      setTimeout(() => {
        this.signedIn = signInStatus
        console.log(this.signedIn)
      }, 2000)
    });
  }

  signOut() {
    this.signInService.signOut()
    this.signInService.removeEmail()
    this.notifService.clearEventData();
    setTimeout(() => {
      this.router.navigate(['/signin'])
    }, 2000)
  }

  toggleMode() {
    this.themeService.toggleTheme()
    this.themeService.darkMode$.subscribe((themeStatus: boolean) => {
      this.darkMode = themeStatus
      console.log(this.darkMode)
  }); 
    document.body.classList.toggle("dark-mode")
  }

  hideBadge() {
    this.showBadge = false
  }
}
