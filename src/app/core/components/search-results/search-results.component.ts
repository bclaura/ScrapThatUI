import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit
{
  currentPage: number = 1;
  pageSize: number = 60;
  totalProducts: number = 0;
  totalPages: number = 1;

  searchQuery: string = '';
  products: Product[] = [];
  loading: boolean = false;

  categoryMapping: { [key: string]: string} = {
    'Laptop / Notebook': 'laptops',
    'Telefoane Mobile': 'phones',
    'Tablete': 'tablets',
    'Smartwatch': 'smartwatch',
    'Bratari fitness': 'fitness',
    'Casti Wireless': 'bluetooth-headsets',
    'Jocuri Consola &amp; PC': 'games',
    'Benzi desenate': 'manga'
  }

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      const page = +params['page'] || 1;
      this.currentPage = page;
      if(this.searchQuery) {
        this.searchProducts();
      }
    })
  }

  searchProducts(): void {
    this.loading = true;
    this.productService.searchProducts(this.searchQuery, this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.totalProducts = response.totalCount;
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching search results', err);
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchQuery, page: this.currentPage}
    });
    this.searchProducts();
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  getCategoryRoute(categoryName: string): string {
    return this.categoryMapping[categoryName] || 'unknown';
  }



}