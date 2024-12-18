import { Component, inject } from '@angular/core';
import { Expense } from '../expense.model';
import { ExpensesService } from '../expense.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; 
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [AgGridAngular]  // Keep only the component here
})
export class StatisticsComponent {
  public columnDefs: ColDef[];
  public rowData: Expense[] = [];
  expensesService = inject(ExpensesService);
  public gridOptions: any; 

  constructor() {
    this.rowData = this.expensesService.expenses;
    console.log(this.rowData);
    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true },
      { headerName: 'Title', field: 'title', sortable: true, filter: true },
      { headerName: 'Amount', field: 'amount', sortable: true, filter: true },
      { headerName: 'Category', field: 'category', sortable: true, filter: true },
      { headerName: 'Author', field: 'author', sortable: true, filter: true },
      { headerName: 'Day', field: 'day', sortable: true, filter: true },
    ];

    this.gridOptions = {
      rowModelType: 'clientSide', 
      modules: [ClientSideRowModelModule], 
      onGridReady: (params: any) => {
        params.api.setRowData(this.rowData);
      }
    };
  }
  
}
