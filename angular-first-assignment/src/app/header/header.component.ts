import { Component, inject, output , input} from '@angular/core';
import { PhotoService } from '../photo.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  author=output<string>();
  authors=input<string[]>();
  selectedAuthor="all";
  service=inject(PhotoService);
  selectAuthor()
  {
    console.log('Am selectat '+ this.selectedAuthor)
    this.author.emit(this.selectedAuthor)
  }
}
