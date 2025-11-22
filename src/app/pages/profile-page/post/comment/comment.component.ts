import { Component, Input, input } from '@angular/core';
import { PostComment } from '../../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { DataTimePipe } from '../../../../helpers/pipes/data-time.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DatePipe, DataTimePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
  @Input() comments!: PostComment;
}
