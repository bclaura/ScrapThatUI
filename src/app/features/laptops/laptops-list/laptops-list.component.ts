import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laptops-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './laptops-list.component.html',
  styleUrl: './laptops-list.component.css'
})
export class LaptopsListComponent implements OnInit {
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
    this.productService.getLaptops().subscribe({
      next: (data: Product[] | null) => {
        if(data) {
          this.totalProducts = data.length;
          this.products = data.slice((this.currentPage - 1) * this.productsPerPage, this.currentPage * this.productsPerPage);
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
    this.router.navigate(['/laptops', page]);
    this.loadProducts();
  }

  onProductsPerPageChange(event: any): void {
    this.productsPerPage = event.target.value;
    this.currentPage = 1;
    this.router.navigate(['/laptops', this.currentPage]);
    this.loadProducts();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
