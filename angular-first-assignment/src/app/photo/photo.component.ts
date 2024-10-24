import { Component, input, output } from '@angular/core';
import { Photo } from './photo.model';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent {
  photo=input<Photo>();
  propagate_link=output<string>()

  clickOnPhoto(link:string )
  {
    console.log('Click '+ link)
    this.propagate_link.emit(link)
  }
}
