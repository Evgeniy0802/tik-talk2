import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { SubcriberCardComponent } from './subcriber-card/subcriber-card.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { ClickDirective, ImgUrlPipe, SvgIconComponent } from '@tt/common-ui'
import { ProfileService } from '@tt/profile'

@Component({
	selector: 'app-sidebar',
	imports: [
		SvgIconComponent,
		RouterLink,
		AsyncPipe,
		SubcriberCardComponent,
		ImgUrlPipe,
		RouterLinkActive,
		ClickDirective
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
	profileService = inject(ProfileService)
	subscribers$ = this.profileService.getSubscribersShortList()

	me = this.profileService.me

	menuItems = [
		{
			label: 'Моя страница',
			icon: 'home',
			link: 'profile/me'
		},
		{
			label: 'Чаты',
			icon: 'chats',
			link: 'chats'
		},
		{
			label: 'Сообщества',
			icon: 'communities',
			link: 'communities'
		},
		{
			label: 'Поиск',
			icon: 'search',
			link: 'search'
		}
	]

	ngOnInit() {
		firstValueFrom(this.profileService.getMe())
	}

	// Переменная для управления видимостью кнопки "Выход"
	showLogOutBtn: boolean = false
	// Метод, который будет вызываться директивой для обновления состояния
	onToggleChange(value: boolean) {
		this.showLogOutBtn = value
	}
}
