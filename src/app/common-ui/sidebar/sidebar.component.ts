import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { SubcriberCardComponent } from './subcriber-card/subcriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ClickDirective } from '../directives/click.directive';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    RouterLink,
    AsyncPipe,
    SubcriberCardComponent,
    ImgUrlPipe,
    RouterLinkActive,
    ClickDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Сообщества',
      icon: 'communities',
      link: 'communities',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  // Переменная для управления видимостью кнопки "Выход"
  showLogOutBtn: boolean = false;
  // Метод, который будет вызываться директивой для обновления состояния
  onToggleChange(value: boolean) {
    this.showLogOutBtn = value;
  }
}
