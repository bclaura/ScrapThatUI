import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if(this.searchQuery.trim()) {
      this.router.navigate(['/search'], {queryParams: {query: this.searchQuery}});
    }
  }
}
