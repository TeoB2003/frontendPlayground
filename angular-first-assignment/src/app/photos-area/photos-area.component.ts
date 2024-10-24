import { Component,DestroyRef,inject, signal, input } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo/photo.model';
import { HttpClient } from '@angular/common/http';
import { PhotoComponent } from '../photo/photo.component';
import { EntirePhotoComponent } from '../entire-photo/entire-photo.component';
@Component({
  selector: 'app-photos-area',
  standalone: true,
  imports: [PhotoComponent, EntirePhotoComponent],
  templateUrl: './photos-area.component.html',
  styleUrl: './photos-area.component.css'
})
export class PhotosAreaComponent  {
  photoService=inject(PhotoService)
  photos=input<Photo[] | undefined>(undefined)
  isFetching=signal(false)
  error=signal('');
  link='';
  showFullPhoto(link:string)
  {
    this.link=link
  }
  
}
