import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { PhotosAreaComponent } from "./photos-area/photos-area.component";
import { EntirePhotoComponent } from "./entire-photo/entire-photo.component";
import { PhotoService } from './photo.service';
import { HttpClient } from '@angular/common/http';
import { Photo } from './photo/photo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PhotosAreaComponent, EntirePhotoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PhotoGallery';
  photoService=inject(PhotoService);
  private httpCLient=inject(HttpClient);
  isFetching=signal(false);
  error=signal('');
  authors: string[]=[];
  photos=signal<Photo[] | undefined>(undefined);
  selectedAuthor="";
  ngOnInit()
  {
    const subscription= this.photoService.getAllPhotos().subscribe(
      {
          next: (photos)=>{ this.photoService.setPhotos(photos); 
            this.photos.set(photos);
            this.authors = Array.from(
              new Set(photos.flatMap(photo => photo.author))
            );

           },
          error:(error: Error)=>{ 
            console.log(error.message)
            this.error.set('Something went wrong');
           },
          complete: ()=>{
            this.isFetching.set(false)
          }
      })
  }
  photosByAuthor(author:string)
  {
    this.selectedAuthor=author;
    this.photos.set(this.photoService.getPhotosByAuthor(this.selectedAuthor));
  }

}
