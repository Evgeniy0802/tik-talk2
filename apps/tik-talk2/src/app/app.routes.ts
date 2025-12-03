import { Routes } from '@angular/router'
import { canActivateAuth, LoginPageComponent } from '@tt/auth'
import {
	ExperemntalFormsComponent,
	ProfilePageComponent,
	SearchPageComponent,
	SettingsPageComponent
} from '@tt/profile'
import { chatsRoutes } from '@tt/chats'
import { LayoutComponent } from '@tt/layout'
import { CommunitiesPageComponent } from '@tt/communities'

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'experemental',
				component: ExperemntalFormsComponent
			},
			{
				path: '',
				redirectTo: 'profile/me',
				pathMatch: 'full'
			},
			{
				path: 'profile/:id',
				component: ProfilePageComponent
			},
			{
				path: 'settings',
				component: SettingsPageComponent
			},
			{
				path: 'search',
				component: SearchPageComponent
			},
			{
				path: 'communities',
				component: CommunitiesPageComponent
			},
			{
				path: 'chats',
				loadChildren: () => chatsRoutes
			}
		],
		canActivate: [canActivateAuth]
	},
	{ path: 'login', component: LoginPageComponent }
]
