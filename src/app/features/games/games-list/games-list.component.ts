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
  selectedDays: number = 7;
  selectedSort: string = '';
  isLoading = true;

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
    
    this.productService.getGames(this.currentPage, this.productsPerPage, +this.selectedDays, this.selectedSort, platformToQuery).subscribe({
      next: (response: any) => {
        if(response && response.products)
        {
          this.products = response.products;
          this.totalProducts = response.totalCount;
          this.isLoading = false;
        } else {
          this.products = [];
          this.totalProducts = 0;
          this.isLoading = false;
        }
        this.filteredProducts = this.products;
        console.log('Filtered Products:', this.filteredProducts);
      },
      error: (err) => {
        console.error('Error fetching products: ', err);
        this.totalProducts = 0;
        this.filteredProducts = [];
        this.products = [];
        this.isLoading = false;
      }
    });
  }
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.navigateToCurrentState();
  }
  


  onProductsPerPageChange(event: any): void {
    this.isLoading = true;
    this.productsPerPage = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.navigateToCurrentState();
  }

  onDaysChange(): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.navigateToCurrentState();
  }

  onSortChange(): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.navigateToCurrentState();
  }

  onPlatformChange(): void {
    this.isLoading = true;
    this.currentPage = 1;
    this.navigateToCurrentState();
  }

  navigateToCurrentState(): void {
    const platformSegment = this.selectedPlatform && this.selectedPlatform !== 'Toate' ? this.selectedPlatform : '';
    
    // Build URL based on platformSegment
    const routePath = platformSegment ? ['/games', platformSegment, this.currentPage] : ['/games', this.currentPage];
    
    this.router.navigate(routePath, {
      queryParams: {
        days: this.selectedDays,
        sort: this.selectedSort,
      }
    });
    this.loadProducts(); // Always load products after navigating
  }

  
  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
