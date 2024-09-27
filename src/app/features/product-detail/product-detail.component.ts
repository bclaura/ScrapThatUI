import { Component, OnInit } from '@angular/core';
import { ProductPriceHistory } from '../../models/productPriceHistory.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule, DatePipe } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables)


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [DatePipe, provideCharts(withDefaultRegisterables())]
})

export class ProductDetailComponent implements OnInit{
  priceHistory: ProductPriceHistory[] = [];
  productId?: number;
  product: Product | null = null;
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private datePipe: DatePipe
  ) {}

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }



  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductDetails(productId).subscribe(data => {
      this.product = data;
    })

    this.productService.getProductPriceHistory(productId).subscribe(history => {
      this.priceHistory = history;
    })
  }

}
