import { Component, input, output,signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  pageNumber = signal(1);
  totalPages = input<number>(3);
  currentPage = output<number>();

  ngOnChanges()
  {
    this.currentPage.emit(1)
    this.pageNumber.set(1)
  }

  plusPage() {
    console.log(this.pageNumber)
    this.pageNumber.set(this.pageNumber()+1);
    this.currentPage.emit(this.pageNumber());
  }
  
  reducePage() {
    this.pageNumber.set(this.pageNumber()-1);
    this.currentPage.emit(this.pageNumber());
  }
}
