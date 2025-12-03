import { Component, effect, inject, ViewChild } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { firstValueFrom } from 'rxjs'
import { RouterLink } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { toObservable } from '@angular/core/rxjs-interop'
import { SvgIconComponent } from '@tt/common-ui'
import { AvatarUploadComponent, ProfileHeaderComponent } from '../../ui'
import { ProfileService } from '@tt/data-access/profile'

@Component({
	selector: 'app-settings-page',
	imports: [
		ReactiveFormsModule,
		AvatarUploadComponent,
		SvgIconComponent,
		RouterLink,
		ProfileHeaderComponent,
		AsyncPipe
	],
	templateUrl: './settings-page.component.html',
	styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
	fb = inject(FormBuilder)
	profileService = inject(ProfileService)

	profile$ = toObservable(this.profileService.me)

	@ViewChild(AvatarUploadComponent)
	avatarUploader!: AvatarUploadComponent

	form = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		username: [{ value: '', disabled: true }, Validators.required],
		description: [''],
		stack: [''],
		city: ['']
	})

	resetForm() {
		this.form.get('firstName')?.reset('')
		this.form.get('lastName')?.reset('')
		this.form.get('description')?.reset('')
		this.form.get('stack')?.reset('')
		this.form.get('city')?.reset('')
	}

	constructor() {
		effect(() => {
			//@ts-ignore
			this.form.patchValue({
				...this.profileService.me(),
				//@ts-ignore
				stack: this.mergeStack(this.profileService.me()?.stack)
			})
		})
	}

	onSave() {
		this.form.markAllAsTouched()
		this.form.updateValueAndValidity()

		if (this.form.invalid) return

		if (this.avatarUploader.avatar) {
			firstValueFrom(
				this.profileService.uploadAvatar(this.avatarUploader.avatar)
			)
		}

		firstValueFrom(
			//@ts-ignore
			this.profileService.patchProfile({
				...this.form.value,
				stack: this.splitStack(this.form.value.stack)
			})
		)
	}

	splitStack(stack: string | null | string[] | undefined) {
		if (!stack) return []
		if (Array.isArray(stack)) return stack

		return stack.split(',')
	}

	mergeStack(stack: string | null | string[] | undefined) {
		if (!stack) return ''
		if (Array.isArray(stack)) return stack.join(',')

		return stack
	}
}
