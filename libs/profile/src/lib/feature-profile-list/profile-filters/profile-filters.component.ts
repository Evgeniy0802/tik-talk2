import { Component, inject, OnDestroy } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs'
import { SvgIconComponent } from '@tt/common-ui'
import { ProfileService } from '@tt/data-access/profile'

@Component({
	selector: 'app-profile-filters',
	imports: [FormsModule, ReactiveFormsModule, SvgIconComponent],
	templateUrl: './profile-filters.component.html',
	styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
	fb = inject(FormBuilder)
	profileService = inject(ProfileService)

	searchForm = this.fb.group({
		firstName: [''],
		lastName: [''],
		city: [''],
		stack: ['']
	})

	searchFormSub!: Subscription

	constructor() {
		this.searchFormSub = this.searchForm.valueChanges
			.pipe(
				startWith({}),
				debounceTime(300),
				switchMap((formValue) => {
					return this.profileService.filterProfiles(formValue)
				})
			)
			.subscribe()
	}

	ngOnDestroy() {
		this.searchFormSub.unsubscribe()
	}
}
