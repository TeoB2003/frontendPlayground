import { Component, inject } from '@angular/core';
import { Expense } from '../shared/models/expense.model';
import { ExpensesService } from '../shared/services/expense.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  AllCommunityModule,
} from 'ag-grid-community';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  imports: [AgGridAngular]
})
export class StatisticsComponent {
  public columnDefs: ColDef[];
  public rowData: Expense[] = [];
  expensesService = inject(ExpensesService);
  public gridOptions: any;

  constructor() {
    this.rowData = this.expensesService.expenses;
    this.columnDefs = [
      { headerName: 'Title', field: 'title', sortable: true },
      { headerName: 'Amount', field: 'amount', sortable: true },
      { headerName: 'Category', field: 'category', filter: 'true' },
      { headerName: 'Day', field: 'day', sortable: true, filter: true },
    ];

    ModuleRegistry.registerModules([
      ClientSideRowModelModule,
      AllCommunityModule
    ]);
  }

}
