import {
	Component,
	ElementRef,
	inject,
	input,
	Renderer2,
	signal,
	SimpleChanges,
	ViewChild
} from '@angular/core'
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component'
import { MessageInputComponent } from '../../../ui'
import { ChatsService } from '../../../data'
import { Chat, Message } from '../../../data'
import {
	debounceTime,
	firstValueFrom,
	fromEvent,
	Subject,
	takeUntil,
	timer
} from 'rxjs'
// @ts-ignore
import { DateTime } from 'luxon'

@Component({
	selector: 'app-chat-workspace-messages-wrapper',
	imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
	templateUrl: './chat-workspace-messages-wrapper.component.html',
	styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
	chatsService = inject(ChatsService)
	r2 = inject(Renderer2)
	hostElement = inject(ElementRef)
	private destroy$ = new Subject<void>()

	chat = input.required<Chat>()

	messages = this.chatsService.activeChatMessages

	// метод для отправки сообщений
	async onSendMessage(messageText: string) {
		await firstValueFrom(
			this.chatsService.sendMessage(this.chat().id, messageText)
		)

		await firstValueFrom(this.chatsService.getChatById(this.chat().id)) // обновление сообщение после отправки
	}

	resizeFeedChat() {
		const { top } = this.hostElement.nativeElement.getBoundingClientRect()
		const height = window.innerHeight - top - 24
		this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
	}

	ngAfterViewInit() {
		this.resizeFeedChat()
		fromEvent(window, 'resize')
			.pipe(debounceTime(500), takeUntil(this.destroy$))
			.subscribe()
	}

	constructor() {
		//запуск таймера для переодической подгрузки новых сообщений
		this.newMassageTimer()
	}

	//метод для переодического запроса сообщений
	private newMassageTimer() {
		timer(0, 100000)
			.pipe(takeUntil(this.destroy$)) //завершение подписки при уничтожение компонента
			.subscribe(async () => {
				await firstValueFrom(this.chatsService.getChatById(this.chat().id))
			})
	}

	// Эта строка говорит Angular: "Найди в моем шаблоне элемент с именем messageContainer и дай мне доступ к нему через переменную this.messageContainer".
	@ViewChild('messageContainer')
	messageContainer!: ElementRef

	ngAfterViewChecked(): void {
		this.scrollToBottom()
	}

	// говорит браузеру: "Установи скролл в этом контейнере на значение, равное его полной высоте". Это и приводит к тому, что скролл автоматически перемещается в самый низ, где находятся новые сообщения.
	private scrollToBottom(): void {
		try {
			this.messageContainer!.nativeElement.scrollTop =
				this.messageContainer!.nativeElement.scrollHeight
		} catch (err) {
			console.error('Ошибка при скролле:', err)
		}
	}

	getGroupMessages() {
		const messagesArray = this.messages()
		const saveGroupMessages = new Map<string, Message[]>() //// Инициализация Map для хранения сгруппированных сообщений.

		//Определение дат "Сегодня" и "Вчера" с помощью Luxon
		//startOf('day') обнуляет время, что важно для корректного сравнения
		const today = DateTime.now().startOf('day')
		const yesterday = today.minus({ days: 1 })

		//// Перебор всех сообщений в исходном массиве
		messagesArray.forEach((message: Message) => {
			//// Преобразование строки даты сообщения в объект DateTime
			const messageDate = DateTime.fromISO(message.createdAt, { zone: 'utc' })
				.setZone(DateTime.local().zone)
				.startOf('day')

			//// Определение метки для текущей даты сообщения
			let dateLabel: string
			if (messageDate.equals(today)) {
				dateLabel = 'Сегодня'
			} else if (messageDate.equals(yesterday)) {
				dateLabel = 'Вчера'
			} else {
				//// Для остальных дней форматируем дату в формат 'dd.MM.yyyy' с помощью toFormat
				dateLabel = messageDate.toFormat('DD')
			}

			// // Добавление сообщения в соответствующую группу
			if (saveGroupMessages.has(dateLabel)) {
				// Если группа уже существует, добавляем сообщение в неё
				saveGroupMessages.get(dateLabel)!.push(message)
			} else {
				// Если группа не существует, создаём её с текущим сообщением
				saveGroupMessages.set(dateLabel, [message])
			}
		})

		return Array.from(saveGroupMessages.entries())
	}
}
