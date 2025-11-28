import { Component, Input, input } from '@angular/core'
import { PostComment } from '../../data'
import { AvatarCircleComponent, DataTimePipe } from '@tt/common-ui'

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
