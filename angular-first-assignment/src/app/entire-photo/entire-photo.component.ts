import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-entire-photo',
  standalone: true,
  imports: [],
  templateUrl: './entire-photo.component.html',
  styleUrl: './entire-photo.component.css'
})

export class EntirePhotoComponent {

  photoLink = input<string>('');
  show = false

  ngOnChanges() {
    if (this.photoLink() != '')
      this.show = true
  }

  closePhoto() {
    this.show = false
  }

}
