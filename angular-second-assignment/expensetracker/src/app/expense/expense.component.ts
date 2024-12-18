import { Component, inject, input, OnInit } from '@angular/core';
import { Expense } from '../expense.model';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '../expense.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit{
   expense=input<Expense>();
   ngOnInit()
   {
     console.log(this.expense())
   }
   expenseService=inject(ExpensesService)
   deletePost(id: number | undefined)
   {
      if(id!=undefined)
        {
        const userConfirmed = confirm('You really want to remove this expense?');  
         if (userConfirmed) {
          this.expenseService.removeExpense(id)
          location.reload();
           } else {
          console.log('Cheltuiala nu a fost ștearsă.');
         }
        }
   }
}
