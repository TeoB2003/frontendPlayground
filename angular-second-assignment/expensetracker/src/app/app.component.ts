import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from './login/login.service';
import { ExpensesService } from './shared/services/expense.service';
import { filter } from 'rxjs';
import { StatisticsComponent } from "./statistics/statistics.component";
import { DayColor } from './shared/enums/colorEnum';
import { DaysOfWeek } from './shared/enums/daysEnum';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterLink, RouterOutlet, StatisticsComponent]
})
export class AppComponent implements OnInit {
  title = 'expensetracker';
  daysOfWeek: string[] = Object.values(DaysOfWeek);
  currentPath: string = '';
  expensesService = inject(ExpensesService)
  logingService = inject(LoginService)
  user = this.logingService.getUserName()
  expenses = this.expensesService.getExpensesForUser(this.user)

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath = this.router.url;
      console.log(this.currentPath);
    });
  }

  getBackgroundColor(day: string): string {
    return !this.router.url.includes(day) ? DayColor[day as keyof typeof DayColor] : 'black';
  }
}
