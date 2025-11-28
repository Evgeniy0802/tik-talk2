import {
	Component,
	ElementRef,
	HostListener,
	inject,
	Renderer2
} from '@angular/core'
import { ProfileCardComponent } from '../../ui'
import { ProfileFiltersComponent } from '../../feature-profile-list'
import { ProfileService } from '../../data'

@Component({
	selector: 'app-search-page',
	imports: [ProfileCardComponent, ProfileFiltersComponent],
	templateUrl: './search-page.component.html',
	styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
	profileService = inject(ProfileService)
	profiles = this.profileService.filteredProfiles

	hostElement = inject(ElementRef)
	r2 = inject(Renderer2)

	@HostListener('window:resize')
	onWindowResize() {
		this.resizeSearch()
	}

	constructor() {}

	ngAfterViewInit() {
		this.resizeSearch()
	}

	resizeSearch() {
		const { top } = this.hostElement.nativeElement.getBoundingClientRect()

		const height = window.innerHeight - top - 24 - 24
		this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
	}
}
