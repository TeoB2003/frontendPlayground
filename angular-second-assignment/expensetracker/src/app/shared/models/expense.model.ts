import {DaysOfWeek} from '../enums/daysEnum'
export interface Expense {
    id:number;
    title: string;    
    amount: number;   
    category: string; 
    author:string;
    day: DaysOfWeek;
  }