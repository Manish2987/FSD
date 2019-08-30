import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RegisterComponent } from './register/register.component';

// ------- Material imports---------
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// -------- Built-in Services/ Modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// ------- User Services Import
import { AuthenticationService } from './services/authentication.service';
import { NewsService } from './services/news.service';
import { RouterService } from './services/router.service';
import { CarousalNewsCardComponent } from './carousal-news-card/carousal-news-card.component';
import { CanActivateRouteGuard } from './guards/can-activate-route.guard';



const appRoutes: Routes = [

	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: DashboardComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'search/:searchText',
		component: SearchComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'favorites',
		component: FavoritesComponent,
		canActivate: [CanActivateRouteGuard]
	}	
];


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DashboardComponent,
		NewsCardComponent,
		SearchComponent,
		FavoritesComponent,
		CarousalNewsCardComponent,
		LoginComponent,
		RegisterComponent],
	imports: [
		MatIconModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatToolbarModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatSelectModule,
		MatDialogModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [NewsService, RouterService, AuthenticationService, CanActivateRouteGuard],
	bootstrap: [AppComponent],
	entryComponents: [DashboardComponent]
})

export class AppModule {

}