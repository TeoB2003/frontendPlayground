import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ExpensesService } from '../shared/services/expense.service';
import { ExpenseComponent } from '../expense/expense.component';
import { Expense } from '../shared/models/expense.model';
import { DaysOfWeek } from '../shared/enums/daysEnum';
import { DayColor } from '../shared/enums/colorEnum';
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
  currentDay: string = '';
  daysOfWeek: string[] = Object.values(DaysOfWeek);

  ngOnInit() {
    this.routeParams.paramMap.subscribe(paramMap => {
      const day = paramMap.get('day');
      if(day!=null)
        this.currentDay=day;
      this.updateExpenses(this.currentDay);
    });
    const initialDay = this.routeParams.snapshot.paramMap.get('day');
    this.updateExpenses(initialDay);
  }

  getBackgroundColor(day: string): string {
    return DayColor[day as keyof typeof DayColor] || '#FFFFFF'; 
  }

  private updateExpenses(day: string | null) {
    if (day) {
      this.expenses = this.expenseService.getExpensesForUser('Dummy User').filter(e => e.day === day as DaysOfWeek && e.category!='');
      this.sum=this.expenses.reduce((acc, a)=> acc=acc+a.amount, 0)
    } else {
      this.expenses = [];
    }
  }
  

}
