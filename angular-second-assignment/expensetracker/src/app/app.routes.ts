import { Routes } from '@angular/router';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { AppComponent } from './app.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

export const routes: Routes = [
    {
        path: ':day/newExpense',
        component:ExpenseFormComponent
    },
    {
        path: ':day',
        component:ExpensesListComponent
    },
    {
        path: ':day/:id/modify',
        component:ExpenseFormComponent
    },
];