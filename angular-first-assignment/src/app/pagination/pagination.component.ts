import { Component,input,output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  pageNumber=1;
  totalPages=input<number>(3);
  currentPage=output<number>();
  plusPage()
  {
    this.pageNumber++;
    this.currentPage.emit(this.pageNumber);
  }
  reducePage()
  {
    this.pageNumber--;
    this.currentPage.emit(this.pageNumber);
  }
}
