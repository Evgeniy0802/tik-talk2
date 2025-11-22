import { Component, inject, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { Chat, LastMessageRes, Message } from '../../../data/interfaces/chats.interface';
import { DataTimePipe } from '../../../helpers/pipes/data-time.pipe';
import { ChatsService } from '../../../data/services/chats.service';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent, DataTimePipe],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageRes>();
  message = input<Message>();
}
