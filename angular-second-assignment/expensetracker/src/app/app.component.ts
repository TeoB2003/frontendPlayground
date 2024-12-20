import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from './login/login.service';
import { ExpensesService } from './expense.service';
import { filter } from 'rxjs';
import { StatisticsComponent } from "./statistics/statistics.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterLink, RouterOutlet, StatisticsComponent, RouterLinkActive]
})
export class AppComponent implements OnInit {
  title = 'expensetracker';
  daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  currentPath: string='';
  expensesService=inject(ExpensesService)
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFB733', '#33FFF5', '#F733FF'];
  logingService=inject(LoginService)
  user=this.logingService.getUserName()
  expenses=this.expensesService.getExpensesForUser(this.user)
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit()
  {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath = this.router.url;  
      console.log(this.currentPath); 
    });
  }
}
