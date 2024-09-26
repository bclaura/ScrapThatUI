import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tablets-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './tablets-list.component.html',
  styleUrl: './tablets-list.component.css'
})
export class TabletsListComponent implements OnInit {
  products?: Product[];
  currentPage: number = 1;
  productsPerPage: number = 60;
  totalProducts: number = 0;
  itemsPerPageOptions: number[] = [12, 24, 48, 60];
  selectedDays: number = 7;
  selectedSort: string = '';

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
      this.productService.getTablets(this.currentPage, this.productsPerPage,  +this.selectedDays, this.selectedSort).subscribe({
        next: (response: any) => {
          this.products = response.products;
          this.totalProducts = response.totalCount;
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
      this.router.navigate(['/tablets', 
      {
        page: this.currentPage,
        days: this.selectedDays,
        sort: this.selectedSort
      }]);
      this.loadProducts();
    }
  
    onProductsPerPageChange(event: any): void {
      this.productsPerPage = event.target.value;
      this.currentPage = 1;
      this.router.navigate(['/tablets', this.currentPage]);
      this.loadProducts();
  }
  
    onDaysChange(): void {
      this.currentPage = 1;
      this.router.navigate(['/tablets', {
        page: this.currentPage,
        days: this.selectedDays,
        sort: this.selectedSort
      }]);
      this.loadProducts();
    }
  
    onSortChange(): void {
      this.currentPage = 1;
      this.router.navigate(['/tablets', {
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
