import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ImgUrlPipe, SvgIconComponent } from '@tt/common-ui'
import { ProfileService } from '@tt/data-access/profile'

@Component({
	selector: 'app-communities-page',
	imports: [AsyncPipe, ImgUrlPipe, SvgIconComponent, ReactiveFormsModule],
	templateUrl: './communities-page.component.html',
	styleUrl: './communities-page.component.scss'
})
export class CommunitiesPageComponent {
	profileService = inject(ProfileService)

	subscribers$ = this.profileService.getSubscribersShortList()
	subscribersAng$ = this.profileService.getSubscribersShortList(6)
	subscribersApl$ = this.profileService.getSubscribersShortList(4)
	subscribersIt$ = this.profileService.getSubscribersShortList(5)
	subscribersIvan$ = this.profileService.getSubscribersShortList(6)
}
