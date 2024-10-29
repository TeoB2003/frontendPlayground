import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { PhotosAreaComponent } from "./photos-area/photos-area.component";
import { EntirePhotoComponent } from "./entire-photo/entire-photo.component";
import { PhotoService } from './photo.service';
import { Photo } from './photo/photo.model';
import { LoaderComponent } from "./loader/loader.component";
import { PaginationComponent } from "./pagination/pagination.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PhotosAreaComponent, EntirePhotoComponent, LoaderComponent, PaginationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PhotoGallery';
  photoService = inject(PhotoService);
  private destroyRef = inject(DestroyRef)
  isFetching = signal(false);
  error = signal('');
  authors: string[] = [];
  photos = signal<Photo[] | undefined>(undefined);
  link = ''
  selectedAuthor = "";
  numberPages = 0
  pageNumber = signal(1)

  ngOnInit() {
    this.isFetching.set(true)
    const subscription = this.photoService.getAllPhotos().subscribe(
      {
        next: (photos) => {
          this.photoService.setPhotos(photos);
          this.photos.set(photos);
          this.authors = Array.from(
            new Set(photos.flatMap(photo => photo.author))
          );

        },
        error: (error: Error) => {
          console.log(error.message)
          this.error.set('Something went wrong');
        },
        complete: () => {
          this.isFetching.set(false)
        }
      })
    this.destroyRef.onDestroy(
      () => subscription.unsubscribe()
    )

  }

  photosByAuthor(author: string) {
    console.log(this.pageNumber())
    console.log('dupa modificare '+this.pageNumber())
    this.selectedAuthor = author;
    this.photos.set(this.photoService.getPhotosByAuthor(this.selectedAuthor));
  }

  setNumberPages(numberPages: number) {
    this.numberPages = numberPages
  }

  currentPage(page: number) {
    this.pageNumber.set(page);
  }

  setLink(link: string) {
    this.link = link
  }
}
