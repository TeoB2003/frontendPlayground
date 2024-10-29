import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './photo/photo.model';
import { error } from 'console';
import { catchError, throwError, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private API_URL = "https://picsum.photos/v2/list";

  private httpClient = inject(HttpClient)
  private photosList: Photo[] = [];

  getAllPhotos() {
    return this.fetchPhotos('Could not fetch the photos');
  }

  getPhotosByAuthor(authorName: string) {
    if (authorName === 'All')
      return this.photosList;
    return this.photosList.filter((photo) => photo.author === authorName)
  }

  getAuthors() {
    this.fetchPhotos('');
    console.log('poze din getAuth ' + this.photosList)
    const authors = this.photosList.map((photo) => photo.author)
    return Array.from(new Set(authors));
  }

  setPhotos(photos: Photo[]) {
    this.photosList = photos;
  }
  
  fetchPhotos(errorMessage: string) {
    return this.httpClient.get<Photo[]>(this.API_URL).pipe(
      catchError((error) => {
        return throwError(() => new Error(errorMessage))
      })
    )
  }
}
