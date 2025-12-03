import { Component, input } from '@angular/core'
import { AvatarCircleComponent, DataTimePipe } from '@tt/common-ui'
import { LastMessageRes, Message } from '@tt/data-access/chats'

@Component({
	selector: 'button[chats]',
	imports: [AvatarCircleComponent, DataTimePipe],
	templateUrl: './chats-btn.component.html',
	styleUrl: './chats-btn.component.scss'
})
export class ChatsBtnComponent {
	chat = input<LastMessageRes>()
	message = input<Message>()
}
