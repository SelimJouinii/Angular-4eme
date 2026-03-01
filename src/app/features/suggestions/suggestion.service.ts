import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestions: Suggestion[] = [];
  private suggestionsSubject = new BehaviorSubject<Suggestion[]>([]);

  constructor() {
    this.loadMockData();
  }

  getSuggestions(): Observable<Suggestion[]> {
    return this.suggestionsSubject.asObservable();
  }

  addSuggestion(suggestion: Suggestion): void {
    console.log('Adding suggestion:', suggestion); // Debug log
    
    // Generate new ID (auto-increment)
    const newId = this.suggestions.length > 0 
      ? Math.max(...this.suggestions.map(s => s.id)) + 1 
      : 1;
    
    suggestion.id = newId;
    
    // Create a new array to trigger change detection
    this.suggestions = [...this.suggestions, suggestion];
    
    console.log('Updated suggestions array:', this.suggestions); // Debug log
    
    // Emit the new array
    this.suggestionsSubject.next(this.suggestions);
  }

  private loadMockData(): void {
    this.suggestions = [
      {
        id: 1,
        title: 'Amélioration wifi',
        description: 'Améliorer la connexion wifi dans les salles de classe',
        category: 'Technologie et services numériques',
        date: new Date('2025-11-20'),
        status: 'en_attente',
        nbLikes: 5
      },
      {
        id: 2,
        title: 'Nouveau menu',
        description: 'Ajouter des options végétariennes à la cafétéria',
        category: 'Restauration et cafétéria',
        date: new Date('2025-11-21'),
        status: 'acceptée',
        nbLikes: 3
      }
    ];
    this.suggestionsSubject.next(this.suggestions);
  }
}