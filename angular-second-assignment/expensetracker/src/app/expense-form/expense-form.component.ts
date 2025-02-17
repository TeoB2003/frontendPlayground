import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpensesService } from '../shared/services/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Expense } from '../shared/models/expense.model';
import { DaysOfWeek } from '../shared/enums/daysEnum';
@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {
  expenseService = inject(ExpensesService)
  routeParams = inject(ActivatedRoute)
  router = inject(Router)
  title = ''
  amount = 0
  category = ''
  ok = true
  day: DaysOfWeek = DaysOfWeek.Sunday
  exisitingCategories = this.expenseService.categories
  buttonText = ''
  selectedCategory = ''
  showSeleect = true

  ngOnInit() {
    let param = this.routeParams.snapshot.paramMap.get('id');
    if (param == null) {
      this.buttonText = 'Add expense'
    }
    else if (param != null) {
      this.buttonText = 'Apply'
      let exp: Expense | undefined = this.expenseService.expenses.find((e) => e.id == +param)
      if (exp != undefined) {
        this.title = exp.title
        this.amount = exp.amount
        this.category = exp.category
      }
    }
  }

  onSubmit(form: NgForm) {
    this.ok = true
    this.title = form.value.title
    this.amount = form.value.amount

    if (this.selectedCategory === 'new')
      this.category = form.value.category

    else
      this.category = this.selectedCategory
    if (this.title == '' || (this.amount <= 0 || this.amount == null) || this.category == '')
      this.ok = false
    else {
      let dayParam = this.routeParams.snapshot.paramMap.get('day')
      if (dayParam && this.isValidDay(dayParam)) {
        this.day = DaysOfWeek[dayParam as keyof typeof DaysOfWeek];
      }
      if (this.ok == true) {
        let param = this.routeParams.snapshot.paramMap.get('id');
        if (param == null)
          this.expenseService.addExpense({
            id: 0,
            author: 'Dummy User',
            category: this.category,
            amount: this.amount,
            title: this.title,
            day: this.day
          })
        else {
          this.expenseService.modifyExpense(+param, this.category, this.amount, this.title)
        }
        this.router.navigate([this.day])
      }
    }
  }

  logCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory
    if (selectedCategory == 'new')
      this.showSeleect = false;
  }

  private isValidDay(day: string): day is keyof typeof DaysOfWeek {
    return Object.keys(DaysOfWeek).includes(day);
  }

}
