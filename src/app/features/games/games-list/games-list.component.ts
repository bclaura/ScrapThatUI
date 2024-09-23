import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.css'
})
export class GamesListComponent implements OnInit {
  products?: Product[];
  currentPage: number = 1;
  productsPerPage: number = 60;
  totalProducts: number = 0;
  itemsPerPageOptions: number[] = [12, 24, 48, 60];
  platforms = ['PlayStation', 'Nintendo', 'Xbox', 'PC'];
  selectedPlatform = '';
  filteredProducts?: Product[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const platform = params['platform'] || '';
      const page = +params['page'] || 1;
  
        console.log('Params Changed:', params);
        this.selectedPlatform = platform;
        this.currentPage = page;
        this.loadProducts();
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  loadProducts(): void {
    console.log('Loading products for: Platform:', this.selectedPlatform, 'Page:', this.currentPage);
    const platformToQuery = this.selectedPlatform === 'Toate' ? '' : this.selectedPlatform;
    
    this.productService.getGames(platformToQuery, this.currentPage, this.productsPerPage).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        if(response && response.products)
        {
          this.products = response.products;
          this.totalProducts = response.totalCount;
        } else {
          this.products = [];
          this.totalProducts = 0;
        }
        this.filteredProducts = this.products;
        console.log('Filtered Products:', this.filteredProducts);
      },
      error: (err) => {
        console.error('Error fetching products: ', err);
        this.totalProducts = 0;
        this.filteredProducts = [];
        this.products = [];
      }
    });
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    const platformSegment = this.selectedPlatform ? this.selectedPlatform : ''; // Empty string for "Toate"
    if(platformSegment) {
      this.router.navigate(['/games', platformSegment, this.currentPage]);
    } else {
      this.router.navigate(['/games', this.currentPage]); // Remove double slash if no platform
    }
    this.loadProducts();
  }

  onProductsPerPageChange(event: any): void {
    this.productsPerPage = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.router.navigate(['/games', this.selectedPlatform || '', this.currentPage]);
    this.loadProducts();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  onPlatformChange(): void {
    this.currentPage = 1;
    if(this.selectedPlatform && this.selectedPlatform !== 'Toate') {
      this.router.navigate(['/games', this.selectedPlatform, this.currentPage]);
    } else {
      this.router.navigate(['/games', this.currentPage]);
    }
    this.loadProducts();
  }

}
