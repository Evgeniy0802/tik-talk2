import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-subcriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subcriber-card.component.html',
  styleUrl: './subcriber-card.component.scss',
})
export class SubcriberCardComponent {
  @Input() profile!: Profile;
}
