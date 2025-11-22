import { Component, effect, inject, input, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { AvatarCircleComponent } from '../../common-ui/avatar-circle/avatar-circle.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings-page',
  imports: [
    ReactiveFormsModule,
    AvatarUploadComponent,
    SvgIconComponent,
    RouterLink,
    ProfileHeaderComponent,
    AsyncPipe,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  profile$ = toObservable(this.profileService.me);

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [''],
  });

  resetForm() {
    this.form.get('firstName')?.reset('');
    this.form.get('lastName')?.reset('');
    this.form.get('description')?.reset('');
    this.form.get('stack')?.reset('');
    this.form.get('city')?.reset('');
  }

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      }),
    );
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
