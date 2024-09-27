import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register chart.js components globally

@Component({
  selector: 'app-product-chart',
  standalone: true,
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {


  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
}