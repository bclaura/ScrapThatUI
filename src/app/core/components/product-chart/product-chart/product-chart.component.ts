import { Component, Input, OnInit, ViewChild, ElementRef, Inject, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../../../services/product.service';
import { ProductPriceHistory } from '../../../../models/productPriceHistory.model';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables); // Register chart.js components globally

@Component({
  selector: 'app-product-chart',
  standalone: true,
  templateUrl: './product-chart.component.html',
  styleUrls: ['./product-chart.component.css']
})
export class ProductChartComponent implements OnInit {

  
  @Input() productId!: number;
  @Input() selectedPeriod: number = 30;
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  chartData: ProductPriceHistory[] = [];
  filteredData: ProductPriceHistory[] = [];
  


  constructor(private service: ProductService, @Inject(PLATFORM_ID) private platformId: any) {}

  /**
   * Loads the chart data for the product.
   * 
   * This method checks if the `productId` is available, and if so, it fetches the product price history
   * from the service. On successful retrieval, it assigns the data to `chartData` and calls `createChart()`
   * to render the chart. If an error occurs during the data retrieval, it logs the error to the console.
   * 
   * @returns {void}
   */
  loadChartData(): void {
    if (this.productId) {
      this.service.getProductPriceHistory(this.productId).subscribe({
        next: (data: ProductPriceHistory[]) => {
          this.chartData = data;
          this.updateTimePeriod(this.selectedPeriod);
        },
        error: (err) => {
          console.error('Error loading chart data:', err);
        }
      });
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadChartData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedPeriod']) {
      this.updateTimePeriod(this.selectedPeriod);
    }
  }

  updateTimePeriod(days: number):void {
    const now = new Date();
    if(days <= 30){
      this.filteredData = this.chartData.filter(item => {
        const diffInDays = (now.getTime() - new Date(item.dateChecked).getTime()) / (1000 * 60 * 60 * 24);
        return diffInDays <= days;       
      });
    } else if (days === 180) {
      this.filteredData = this.filterByMonths(6);
    } else if(days == 360) {
      this.filteredData = this.filterByMonths(12);
    }

    if(isPlatformBrowser(this.platformId))
    {
      this.createChart();
    }

  }

  filterByMonths( months: number): ProductPriceHistory[] {
    const now = new Date();
    const result: ProductPriceHistory[] = [];
    const seenMonths = new Set<string>();

    for(const item of this.chartData) {
      const itemDate = new Date(item.dateChecked);
      const monthYear = `${itemDate.getMonth() + 1}-${itemDate.getFullYear()}`;
      const diffInMonths = (now.getFullYear() - itemDate.getFullYear()) * 12 + (now.getMonth() - itemDate.getMonth());

      if (diffInMonths <= months && !seenMonths.has(monthYear)) {
        result.push(item);
        seenMonths.add(monthYear);
      }
    }
      return result;
  }

  /**
   * Creates a line chart displaying the price over time using Chart.js.
   * 
   * This method initializes a chart on a canvas element, using the data provided
   * in `this.chartData`. It maps the prices and dates from the data to plot the
   * chart. The chart is configured to be responsive and includes titles for both
   * the X and Y axes.
   * 
   * @remarks
   * - The canvas context is retrieved from `this.chartCanvas.nativeElement`.
   * - The chart data is expected to have `price` and `dateChecked` properties.
   * - The X-axis represents dates, and the Y-axis represents prices.
   * 
   * @throws Will log an error if the canvas context is null or undefined.
   */
  createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const prices = this.filteredData.map(item => item.price);
    const dates = this.filteredData.map(item => {
        const itemDate = new Date(item.dateChecked);
        
        if (this.selectedPeriod === 180 || this.selectedPeriod === 360) {
            return itemDate.toLocaleString('ro-RO', { month: 'long', year: 'numeric' });
        } else {
            return itemDate.toLocaleDateString('ro-RO'); 
        }
    });


    if(this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: dates, // X-axis labels (dates)
        datasets: [
          {
            label: 'Modificarile pretului',
            data: prices, // Y-axis data (prices)
            borderColor: 'blue',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Perioada'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Pret'
            },
            beginAtZero: false
          }
        }
      }
    });
  }
}