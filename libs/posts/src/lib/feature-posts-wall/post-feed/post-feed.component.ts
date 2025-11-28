import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	inject,
	Input,
	Output,
	Renderer2
} from '@angular/core'
import {
	debounceTime,
	firstValueFrom,
	fromEvent,
	Subject,
	takeUntil
} from 'rxjs'
import { PostService } from '../../data'
import { PostInputComponent } from '../../ui'
import { PostComponent } from '../index'
import { GlobalStoreService } from '@tt/shared'

@Component({
	selector: 'app-post-feed',
	imports: [PostInputComponent, PostComponent],
	templateUrl: './post-feed.component.html',
	styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {
	postService = inject(PostService)
	feed: any[] = []
	r2 = inject(Renderer2)
	hostElement = inject(ElementRef)
	profile = inject(GlobalStoreService).me
	private destroy$ = new Subject<void>()

	@Input() isCommentInput = false
	@Input() postId: number = 0

	@Output() created = new EventEmitter<void>()
	@HostBinding('class.comment')
	get isComment() {
		return this.isCommentInput
	}

	constructor() {
		this.loadPosts() //загружаем посты
	}

	ngOnInit() {}

	ngAfterViewInit() {
		this.resizeFeed()
		fromEvent(window, 'resize')
			.pipe(
				debounceTime(100), //Задержка в 300 миллисекунд
				takeUntil(this.destroy$) //Отписка при уничтожении компонента
			)
			.subscribe()
	}

	resizeFeed() {
		const { top } = this.hostElement.nativeElement.getBoundingClientRect()
		const height = window.innerHeight - top - 48
		this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
	}

	//Метод для загрузки постов
	private loadPosts() {
		firstValueFrom(this.postService.fetchPost())
			.then((posts) => {
				this.feed = posts // Сохраняем загруженные посты в feed
			})
			.catch((error) => {
				console.error('Error loading posts:', error)
			})
	}

	//Метод для создания поста или комментария
	onCreatePost(postText: string) {
		if (!postText) return

		//Создание поста
		firstValueFrom(
			this.postService.createPost({
				title: 'Клёвый пост',
				content: postText,
				authorId: this.profile()!.id
			})
		)
			.then(() => {
				this.loadPosts() //Обновляем посты после создание поста
			})
			.catch((error) => {
				console.error('Error loading post:', error)
			})
	}

	trackByPostId(index: number, post: any): number {
		return post.id
	}
}
