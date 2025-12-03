import { Component, Input, input } from '@angular/core'
import { AvatarCircleComponent, DataTimePipe } from '@tt/common-ui'
import { PostComment } from '@tt/data-access/posts'

@Component({
	selector: 'app-comment',
	imports: [AvatarCircleComponent, DataTimePipe],
	templateUrl: './comment.component.html',
	styleUrl: './comment.component.scss'
})
export class CommentComponent {
	comment = input<PostComment>()
	@Input() comments!: PostComment
}
