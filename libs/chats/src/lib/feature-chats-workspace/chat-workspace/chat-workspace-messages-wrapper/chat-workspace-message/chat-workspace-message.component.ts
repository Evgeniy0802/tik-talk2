import { Component, HostBinding, input } from '@angular/core'
import { DatePipe } from '@angular/common'
import { AvatarCircleComponent, DataTimePipe, HhMmPipe } from '@tt/common-ui'
import { Message } from '@tt/data-access/chats'

@Component({
	selector: 'app-chat-workspace-message',
	imports: [AvatarCircleComponent, DatePipe, DataTimePipe, HhMmPipe],
	templateUrl: './chat-workspace-message.component.html',
	styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {
	message = input.required<Message>()

	@HostBinding('class.is-mine')
	get isMine() {
		return this.message().isMine
	}
}
