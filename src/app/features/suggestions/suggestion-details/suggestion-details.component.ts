import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionsService, Suggestion } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionsService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.loadSuggestion(id);
    }
  }

  loadSuggestion(id: number): void {
    // This should be getSuggestionById (check if your service has this)
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data: Suggestion) => {
        this.suggestion = data;
      },
      error: (err: any) => {
        console.error('Error loading suggestion:', err);
        // Fallback to local data
        const localSuggestions = this.suggestionService.getSuggestionsListLocal();
        this.suggestion = localSuggestions.find((s: Suggestion) => s.id === id) || null;
      }
    });
  }

  updateSuggestion(): void {
    if (this.suggestion?.id) {
      this.router.navigate(['/edit-suggestion', this.suggestion.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }
}