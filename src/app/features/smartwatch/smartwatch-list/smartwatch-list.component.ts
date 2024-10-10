import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-smartwatch-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './smartwatch-list.component.html',
  styleUrl: './smartwatch-list.component.css'
})
export class SmartwatchListComponent implements OnInit {
  products?: Product[];
  currentPage: number = 1;
  productsPerPage: number = 60;
  totalProducts: number = 0;
  itemsPerPageOptions: number[] = [12, 24, 48, 60];
  selectedDays: number = 7;
  selectedSort: string = '';
  isLoading = true;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const page = +params['page'] || 1;
      this.currentPage = page;
      this.loadProducts();
});
}

get totalPages(): number {
  return Math.ceil(this.totalProducts / this.productsPerPage);
}

  loadProducts(): void {
    this.productService.getSmartwatches(this.currentPage, this.productsPerPage, +this.selectedDays, this.selectedSort).subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.totalProducts = response.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.totalProducts = 0;
        this.products = [];
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate(['/smartwatch', 
    {
      page: this.currentPage,
      days: this.selectedDays,
      sort: this.selectedSort
    }]);
    this.loadProducts();
  }

  onProductsPerPageChange(event: any): void {
    this.isLoading = true;
    this.productsPerPage = event.target.value;
    this.currentPage = 1;
    this.router.navigate(['/smartwatch', this.currentPage]);
    this.loadProducts();
}

  onDaysChange(): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.router.navigate(['/smartwatch', {
      page: this.currentPage,
      days: this.selectedDays,
      sort: this.selectedSort
    }]);
    this.loadProducts();
  }

  onSortChange(): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.router.navigate(['/smartwatch', {
      page: this.currentPage,
      days: this.selectedDays,
      sort: this.selectedSort
    }]);
    this.loadProducts();
  }

goToLink(url: string) {
  window.open(url, "_blank");
}
}
