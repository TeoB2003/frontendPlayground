import { Component,inject, signal, input,output } from '@angular/core';
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
  photosArray: Photo[]=[]
  numberPages=output<number>();
  page=input<number>(0);
  isFetching=signal(false)
  error=signal('');
  link='';
  showFullPhoto(link:string)
  {
    this.link=link
  }
  ngOnChanges()
  {
    const array=this.photos();
    if (array)
    this.photosArray=array.slice((this.page()-1)*12, this.page()*12)
    console.log(array?.length)
    if(this.photos() && array)
     this.numberPages.emit(Math.ceil(array.length / 12))
  }

  
}
