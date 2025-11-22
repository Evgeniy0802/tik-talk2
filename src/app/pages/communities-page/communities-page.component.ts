import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../../data/services/profile.service';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-communities-page',
  imports: [AsyncPipe, ImgUrlPipe, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './communities-page.component.html',
  styleUrl: './communities-page.component.scss',
})
export class CommunitiesPageComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  subscribersAng$ = this.profileService.getSubscribersShortList(6);
  subscribersApl$ = this.profileService.getSubscribersShortList(4);
  subscribersIt$ = this.profileService.getSubscribersShortList(5);
  subscribersIvan$ = this.profileService.getSubscribersShortList(6);
}
