import { Component, inject } from '@angular/core'
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component'
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component'
import { MessageInputComponent } from '../../ui'
import { ActivatedRoute, Router } from '@angular/router'
import { ChatsService } from '../../data'
import { of, switchMap } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
	selector: 'app-chat-workspace',
	imports: [
		ChatWorkspaceHeaderComponent,
		ChatWorkspaceMessagesWrapperComponent,
		MessageInputComponent,
		AsyncPipe
	],
	templateUrl: './chat-workspace.component.html',
	styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent {
	route = inject(ActivatedRoute)
	chatsService = inject(ChatsService)
	router = inject(Router)

	activeChats$ = this.route.params.pipe(
		switchMap(({ id }) => {
			if (id === 'new') {
				//если айдишник новый равен new
				return this.route.queryParams.pipe(
					//берем куери параметр
					switchMap(({ userId }) => {
						return this.chatsService.createChat(userId).pipe(
							//создаём новый чат
							switchMap((chat) => {
								this.router.navigate(['chats', chat.id]) //перенаправляемся с айдишника этого чата на чат
								return of(null) //вернули нулл он закончился
							})
						)
					})
				)
			}
			return this.chatsService.getChatById(id)
		})
	)
}
