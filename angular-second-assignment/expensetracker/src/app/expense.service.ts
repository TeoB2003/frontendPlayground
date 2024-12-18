import { Injectable } from '@angular/core';

import { type Expense } from './expense.model';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
    expenses: Expense[] = [{
        id:0,
        title: 'Achizitie masina',
        amount: 20000,
        category: 'Auto',
        author: 'Dummy User',
        day: 'Monday'
    }]
    inUseExpenses: Expense[]=[]
    maxId=1
    constructor() {
        const expenses = localStorage.getItem('expenses');

        if (expenses) {
            this.expenses = JSON.parse(expenses);
        }
        let array=this.expenses.map( (e)=> e.id )
        console.log("In")
        this.maxId = array.length > 0 ? Math.max(...array) : 0;
        console.log(this.maxId)

    }
    getExpensesForUser(name: string) {
        this.inUseExpenses=this.expenses.filter((a) => a.author == name)
        return this.inUseExpenses
        
    }

    addExpense(expense: Expense) {
        this.maxId++
        this.expenses.unshift({
           id: this.maxId,
           author: expense.author,
           category: expense.category,
           amount:expense.amount,
           title:expense.title,
           day: expense.day
        });
        this.saveTasks();
    }

    removeExpense(id: number) {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    modifyExpense(id: number, category: string, amount:number, title: string)
    {
        let e : Expense | undefined=this.expenses.find((e) => e.id===id)
        if(e!=undefined)
        {
            e.amount=amount
            e.category=category
            e.title=title
            this.saveTasks()
        }
    }


}