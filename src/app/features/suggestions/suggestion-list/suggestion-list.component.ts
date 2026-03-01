import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  suggestions: Suggestion[] = [];
  filteredSuggestions: Suggestion[] = [];
  searchTerm: string = '';
  filteredCategory: string = 'all';
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

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestionService.getSuggestions().subscribe(suggestions => {
      this.suggestions = suggestions;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredSuggestions = this.suggestions.filter(suggestion => {
      const matchesSearch = suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           suggestion.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.filteredCategory === 'all' || suggestion.category === this.filteredCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  likeSuggestion(id: number): void {
    // Implement like functionality if needed
    console.log('Like suggestion:', id);
  }
}