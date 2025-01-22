import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ExpensesService } from '../shared/services/expense.service';
import { ExpenseComponent } from '../expense/expense.component';
import { Expense } from '../shared/models/expense.model';
@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [ExpenseComponent, RouterLink, RouterOutlet],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent implements OnInit{
  expenseService=inject(ExpensesService)
  expenses: Expense[]=[]
  sum=0
  routeParams=inject(ActivatedRoute)
  currentDay=''

  daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFB733', '#33FFF5', '#F733FF'];

  ngOnInit() {
    this.routeParams.paramMap.subscribe(paramMap => {
      const day = paramMap.get('day');
      if(day!=null)
        this.currentDay=day
      this.updateExpenses(day);
    });
    const initialDay = this.routeParams.snapshot.paramMap.get('day');
    this.updateExpenses(initialDay);
  }

  private updateExpenses(day: string | null) {
    if (day) {
      this.expenses = this.expenseService.getExpensesForUser('Dummy User').filter(e => e.day === day);
      this.sum=this.expenses.reduce((acc, a)=> acc=acc+a.amount, 0)
      console.log(this.expenses); 
    } else {
      this.expenses = [];
    }
  }

}
