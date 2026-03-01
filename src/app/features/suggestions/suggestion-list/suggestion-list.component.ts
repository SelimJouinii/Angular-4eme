import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestionsService, Suggestion } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {
  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    // FIXED: Use getSuggestionsList() not getSuggestions()
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data: Suggestion[]) => {
        this.suggestions = data;
      },
      error: (err: any) => {
        console.error('Error loading suggestions, using local data:', err);
        this.suggestions = this.suggestionService.getSuggestionsListLocal();
      }
    });
  }

  deleteSuggestion(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Voulez-vous vraiment supprimer cette suggestion?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          this.loadSuggestions();
        },
        error: (err: any) => console.error('Error deleting suggestion:', err)
      });
    }
  }

  likeSuggestion(id: number | undefined): void {
    if (!id) return;
    
    this.suggestionService.likeSuggestion(id).subscribe({
      next: () => {
        this.loadSuggestions();
      },
      error: (err: any) => console.error('Error liking suggestion:', err)
    });
  }

  viewDetails(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/suggestion', id]);
    }
  }

  editSuggestion(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/edit-suggestion', id]);
    }
  }
}