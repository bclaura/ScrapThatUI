import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phones-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './phones-list.component.html',
  styleUrl: './phones-list.component.css'
})
export class PhonesListComponent implements OnInit {
  products?: Product[];
  currentPage: number = 1;
  productsPerPage: number = 60;
  totalProducts: number = 0;
  itemsPerPageOptions: number[] = [12, 24, 48, 60];

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
    this.productService.getPhones(this.currentPage, this.productsPerPage).subscribe({
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
    this.router.navigate(['/phones', page]);
    this.loadProducts();
  }

  onProductsPerPageChange(event: any): void {
    this.productsPerPage = event.target.value;
    this.currentPage = 1;
    this.router.navigate(['/phones', this.currentPage]);
    this.loadProducts();
}

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
