import { Component, inject, input, OnInit, signal } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { CommentComponent, PostInputComponent } from '../../ui'
import {
	AvatarCircleComponent,
	DataTimePipe,
	SvgIconComponent
} from '@tt/common-ui'
import { GlobalStoreService } from '@tt/data-access/shared'
import { Post, PostComment, PostService } from '@tt/data-access/posts'

@Component({
	selector: 'app-post',
	imports: [
		AvatarCircleComponent,
		SvgIconComponent,
		PostInputComponent,
		CommentComponent,
		DataTimePipe
	],
	templateUrl: './post.component.html',
	styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
	post = input<Post>()
	profile = inject(GlobalStoreService).me
	comments = signal<PostComment[]>([])

	postService = inject(PostService)

	async ngOnInit() {
		this.comments.set(this.post()!.comments)
	}

	//создать комментарии и запросить все
	async onCreated(commentText: string) {
		//Создание комментариев
		firstValueFrom(
			this.postService.createComment({
				text: commentText,
				authorId: this.profile()!.id,
				postId: this.post()!.id
			})
		)
			.then(async () => {
				const comments = await firstValueFrom(
					this.postService.getCommentsByPostId(this.post()!.id)
				)
				this.comments.set(comments)
			})
			.catch((error) => {
				console.error('Error loading comment:', error)
			})
		return
	}
}
