import { Component, OnInit } from '@angular/core';
import { ProductPriceHistory } from '../../models/productPriceHistory.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductChartComponent } from '../../core/components/product-chart/product-chart/product-chart.component';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductChartComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [DatePipe]
})

export class ProductDetailComponent implements OnInit{
  priceHistory: ProductPriceHistory[] = [];
  productId!: number;
  product: any;
  selectedPeriod:number = 30;
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private datePipe: DatePipe
  ) {}

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }



  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId);

    this.productService.getProductDetails(this.productId).subscribe({
      next: (data) => {
        console.log('Product Details:', data); // Check if product data is being fetched
        this.product = data;
      },
      error: (err) => {
        console.error('Error loading product details:', err);
      }
    });

  this.productService.getProductPriceHistory(this.productId).subscribe({
    next: (history) => {
      console.log('Price History:', history); // Check if price history is being fetched
      this.priceHistory = history;
    },
    error: (err) => {
      console.error('Error loading price history:', err);
    }
  });
}

}
