import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

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
  platforms = [' PlayStation', ' Nintendo Switch', ' Xbox', ' PC'];
  selectedPlatform = '';
  filteredProducts: Product[] = [];

  platformFilterSubject: Subject<string> = new Subject<string>();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const page = +params['page'] || 1;
      this.currentPage = page;
      this.loadProducts();
    });
  

      // Handle debounce for filtering
      this.platformFilterSubject.pipe(
        debounceTime(300)  // Adjust this value to control the debounce timing
      ).subscribe(platform => {
        this.selectedPlatform = platform;
        this.filterByPlatform(); // Call the filter function after debouncing
      });
    }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.productsPerPage);
  }

  loadProducts(): void {
    this.productService.getGames().subscribe({
      next: (data: Product[] | null) => {
        if (data) {
          // Apply platform filtering first
          this.products = data;
          this.filterByPlatform(); // Filter products by platform first
        } else {
          this.totalProducts = 0;
          this.products = [];
        }
      },
      error: (err) => {
        console.error('Error fetching products: ', err);
        this.totalProducts = 0;
        this.products = [];
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate(['/games', page]);
    this.loadProducts();
  }

  onProductsPerPageChange(event: any): void {
    this.productsPerPage = event.target.value;
    this.currentPage = 1;
    this.router.navigate(['/games', this.currentPage]);
    this.loadProducts();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }


  filterByPlatform(): void {
    if (!this.selectedPlatform) {
      this.filteredProducts = this.products!; // Show all if no platform selected
    } else {
      this.filteredProducts = this.products!.filter(product =>
        product.name.toLowerCase().includes(this.selectedPlatform.toLowerCase())
      );
    }
    this.totalProducts = this.filteredProducts.length;

    // Apply pagination on filtered products
    this.filteredProducts = this.filteredProducts.slice(
      (this.currentPage - 1) * this.productsPerPage,
      this.currentPage * this.productsPerPage
    );
  }

  onPlatformChange(platform: string): void {
    this.platformFilterSubject.next(platform); // Trigger debounce and filter
  }

}
