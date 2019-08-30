import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText: string;
  isUserLoggedIn: Observable<boolean>;
  constructor(private routerService: RouterService, private authService: AuthenticationService) { }
  ngOnInit() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn;
  }

  routeToFavorites() {
    this.routerService.routeToFavorites();
  }

  routeToDashboard() {
    this.routerService.routeToHome();
  }

  routeToSearch() {
    if (this.searchText != '') {
      console.log('search text not empty');
      this.routerService.routeToSearchView(this.searchText);
    }
    this.searchText = '';
  }
}
