import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './all-list.component.html',
  styleUrl: './all-list.component.css'
})
export class AllListComponent implements OnInit {
  products?: Product[];
  currentPage: number = 1;
  productsPerPage: number = 60;
  totalProducts: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

    loadProducts(): void {
      this.productService.getProducts().subscribe({
        next: (data: Product[] | null) => {
          console.log('API Response:', data); // Log the response
          if (data) {
            this.totalProducts = data.length;
            this.products = data.slice((this.currentPage - 1) * this.productsPerPage, this.currentPage * this.productsPerPage);
          } else {
            this.totalProducts = 0;
            this.products = [];
          }
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.totalProducts = 0;
          this.products = [];
        }
      });
    }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts;
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
