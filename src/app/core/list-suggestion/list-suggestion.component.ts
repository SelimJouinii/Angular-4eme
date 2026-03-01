import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuggestionsService } from '../../features/suggestions/suggestion.service';
import { Suggestion } from '../../models/suggestion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit, OnDestroy {
  suggestions: Suggestion[] = [];
  filteredSuggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];
  searchTerm: string = '';
  filteredCategory: string = 'all';
  private subscription: Subscription = new Subscription();
  
  categories: string[] = [
    'all',
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(private suggestionService: SuggestionsService) {}

  ngOnInit(): void {
    this.subscription = this.suggestionService.getSuggestionsList().subscribe((suggestions: Suggestion[]) => {
      console.log('Received suggestions:', suggestions);
      this.suggestions = suggestions;
      this.applyFilters(); // Apply filters whenever suggestions change
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applyFilters(): void {
    if (!this.suggestions || this.suggestions.length === 0) {
      this.filteredSuggestions = [];
      return;
    }

    console.log('Applying filters - Search:', this.searchTerm, 'Category:', this.filteredCategory);
    
    this.filteredSuggestions = this.suggestions.filter(suggestion => {
      // Search filter
      const matchesSearch = this.searchTerm === '' || 
        suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = this.filteredCategory === 'all' || 
                            suggestion.category === this.filteredCategory;
      
      return matchesSearch && matchesCategory;
    });

    console.log('Filtered suggestions:', this.filteredSuggestions);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  onCategoryChange(event: any): void {
    this.filteredCategory = event.target.value;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filteredCategory = 'all';
    this.applyFilters();
    
    // Reset input fields if they exist
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    if (categorySelect) categorySelect.value = 'all';
  }

  likeSuggestion(suggestion: Suggestion): void {
    console.log('Liking suggestion:', suggestion);
    suggestion.nbLikes = (suggestion.nbLikes || 0) + 1;
  }

  addToFavorites(suggestion: Suggestion): void {
    console.log('Adding to favorites:', suggestion);
    if (!this.favorites.find(f => f.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(f => f.id === suggestion.id);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'acceptée': return 'badge-success';
      case 'refuse': return 'badge-danger';
      case 'en_attente': return 'badge-warning';
      default: return 'badge-secondary';
    }
  }
}