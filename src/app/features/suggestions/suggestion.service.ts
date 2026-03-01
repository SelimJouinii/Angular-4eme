import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Make sure this interface is EXPORTED
export interface Suggestion {
  id?: number;
  title: string;
  description: string;
  category: string;
  date?: Date;
  status?: string;
  nbLikes?: number;
}

@Injectable({
  providedIn: 'root'  // This makes the service available app-wide
})
export class SuggestionsService {  // Make sure the class name matches exactly
  // Local data for Part 1
  private suggestionList: Suggestion[] = [
    { id: 1, title: 'Améliorer l\'interface', description: 'Ajouter un thème sombre', category: 'UI/UX', nbLikes: 5 },
    { id: 2, title: 'Ajouter la recherche', description: 'Permettre de rechercher des suggestions', category: 'Fonctionnalité', nbLikes: 3 },
    { id: 3, title: 'Notifications', description: 'Alerter quand une suggestion est approuvée', category: 'Communication', nbLikes: 7 }
  ];

  // Backend URL
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }  // Inject HttpClient

  // Part 1: Local method
  getSuggestionsListLocal(): Suggestion[] {
    return this.suggestionList;
  }

  // Part 2: HTTP methods
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  updateSuggestion(id: number, suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${id}`, suggestion);
  }

  likeSuggestion(id: number): Observable<any> {
    return this.http.patch(`${this.suggestionUrl}/${id}/like`, {});
  }
}