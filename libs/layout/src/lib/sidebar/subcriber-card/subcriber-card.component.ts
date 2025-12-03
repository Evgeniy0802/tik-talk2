import { Component, Input } from '@angular/core'
import { ImgUrlPipe } from '@tt/common-ui'
import { Profile } from '@tt/data-access/profile'

@Component({
	selector: 'app-subcriber-card',
	imports: [ImgUrlPipe],
	templateUrl: './subcriber-card.component.html',
	styleUrl: './subcriber-card.component.scss'
})
export class SubcriberCardComponent {
	@Input() profile!: Profile
}
