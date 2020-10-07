import { Task } from './models/task';
import { Product } from './models/product';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import tdata from './resources/tasks.json';
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

  constructor(private fb: FormBuilder) {
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
    this.newcustomer = 27;
    this.allproducts = 1560;
    this.allbills = 64;

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
    this.stocks = sdata;
    this.totalRecords = sdata.length;
    this.loading = true;

    this.tasks = tdata;
    this.totalTasks = tdata.length;
  }
  loadStocks(event: LazyLoadEvent) {
    this.loading = true;
    event.rows = 3;

    setTimeout(() => {
      if (this.stocks) {
        this.products = this.stocks.slice(
          event.first,
          event.first + event.rows
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
    // this.newTask.id=Math.floor(Math.random() * 100) number field is empty now.
    this.tasks.push(this.newTask);
    this.newTask = null;
    this.display = false;
    this.taskForm.reset();
  }
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
