import { Component, inject, input, OnInit } from '@angular/core';
import { Expense } from '../shared/models/expense.model';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '../shared/services/expense.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  expense = input<Expense>();
  expenseService = inject(ExpensesService)

  ngOnInit() {
    console.log(this.expense())
  }

  deletePost(id: number | undefined) {
    if (id != undefined) {
      const userConfirmed = confirm('You really want to remove this expense?');
      if (userConfirmed) {
        this.expenseService.removeExpense(id)
        location.reload();
      }
    }
  }
}
