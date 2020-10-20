import { Account } from './models/account';
import { DataService } from './services/data.service';
import { Task } from './models/task';
import { Product } from './models/product';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import sdata from './resources/stocks.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  display: boolean = false;
  taskForm: FormGroup;

  totals:any[];
  stocksource:Product[];
  stocks: Product[];
  totalRecords: number;
  loading: boolean;
  cols: any[];
  products: Product[];

  tasks: Task[];
  totalTasks: number;

  data: any;
  data2: any;
  data3: any;

  newcustomer: number;
  allbills: number;
  allproducts: number;

  newTask: Task;

  account:Account[];
  month:string[]=[];
  income:number[]=[];
  expense:number[]=[];


  constructor(private fb: FormBuilder,private dataService:DataService) {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Gelir',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'Gider',
          backgroundColor: '#ff6a6a',
          borderColor: '#ee6363',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };
    this.data2 = {
      labels: ['Nakit', 'Kredi Kartı', 'Mail-Order'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    this.data3 = {
      labels: ['Klima', 'Kombi', 'Hava Temizleyici'],
      datasets: [
        {
          data: [40, 50, 100],
          backgroundColor: ['#8e0101', '#0a5400', '#ff7f00'],
          hoverBackgroundColor: ['#FF6384', '#047a18', '#FFCE56'],
        },
      ],
    };

    this.taskForm = this.fb.group({
      id: [null],
      description: [null, Validators.required],
      date: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.dataService.getAccount().subscribe(data=>{
      this.account=data;
      for (const acc of this.account) {
        this.month.push(acc.month);
        this.income.push(acc.income);
        this.expense.push(acc.expense);
      }
      console.log(this.month);
    })
    this.dataService.getProduct().subscribe(data=>{
      this.stocksource = data;
      this.totalRecords = data.length
    })
    this.dataService.getMostSale().subscribe(data =>{
      this.products = data;
    })
    this.dataService.getTotals().subscribe(data=>{
      this.totals=data;
      for (const iter of this.totals) {
        if(iter.name=="allbills"){
          this.allbills=iter.piece;
        }
        if(iter.name=="totalsale"){
          this.allproducts=iter.piece;
        }
        if(iter.name=="newcustomer"){
          this.newcustomer=iter.piece;
        }
          
        
      }
    })
    
    this.loading = true;

    this.dataService.getTasks().subscribe(tsk=>{
      this.tasks=tsk;
      this.totalTasks=tsk.length;
    })
    
  }
  loadStocks(event: LazyLoadEvent) {
    this.loading = true;
    event.rows = 5;

    setTimeout(() => {
      if (this.stocksource) {
        this.stocks = this.stocksource.slice(
          event.first,
          (event.first + event.rows)
        );
        this.loading = false;
      }
    }, 1000);
  }
  showDialog() {
    this.display = true;
  }

  update() {
    this.newTask = Object.assign({}, this.taskForm.value);
    this.dataService.createTask(this.newTask).subscribe(data => this.tasks.push(data));
    window.location.reload();
  }
  removeTask(task:Task) {
    this.dataService.deleteTask(task.id).subscribe();
    window.location.reload();
  }
}
