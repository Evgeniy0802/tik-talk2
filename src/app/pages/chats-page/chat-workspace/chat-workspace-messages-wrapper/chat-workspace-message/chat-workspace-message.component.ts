import { Component, ElementRef, HostBinding, input, SimpleChanges } from '@angular/core';
import { Message } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import { DataTimePipe } from '../../../../../helpers/pipes/data-time.pipe';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { from } from 'rxjs';
import {HhMmPipe} from "../../../../../helpers/pipes/hh-mm.pipe";

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe, DataTimePipe, HhMmPipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
