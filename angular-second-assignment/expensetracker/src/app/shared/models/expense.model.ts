export interface Expense {
    id:number;
    title: string;    
    amount: number;   
    category: string; 
    author:string;
    day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  }