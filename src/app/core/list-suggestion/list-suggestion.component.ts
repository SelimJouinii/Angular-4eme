import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent {
  suggestions: Suggestion[] = [
    { 
      id: 1, 
      title: 'Organiser une journée team building', 
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.', 
      category: 'Événements', 
      date: new Date('2025-01-20'), 
      status: 'acceptée', 
      nbLikes: 10,
      isFavorite: false
    },
    { 
      id: 2, 
      title: 'Améliorer le système de réservation', 
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.', 
      category: 'Technologie', 
      date: new Date('2025-01-15'), 
      status: 'refuse', 
      nbLikes: 0,
      isFavorite: false
    },
    { 
      id: 3, 
      title: 'Créer un système de récompenses', 
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.', 
      category: 'Ressources Humaines', 
      date: new Date('2025-01-25'), 
      status: 'refuse', 
      nbLikes: 0,
      isFavorite: false
    },
    { 
      id: 4, 
      title: 'Moderniser l\'interface utilisateur', 
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.', 
      category: 'Technologie', 
      date: new Date('2025-01-30'), 
      status: 'en_attente', 
      nbLikes: 0,
      isFavorite: false
    }
  ];

  searchTerm: string = '';
  filteredCategory: string = '';
  favorites: Suggestion[] = [];

  // Méthode pour incrémenter les likes
  likeSuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  // Méthode pour ajouter aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.includes(suggestion)) {
      this.favorites.push(suggestion);
      suggestion.isFavorite = true;
    }
  }

  // Méthode pour filtrer les suggestions
  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(suggestion => {
      const matchesSearch = suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           suggestion.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.filteredCategory || suggestion.category === this.filteredCategory;
      return matchesSearch && matchesCategory;
    });
  }

  // Récupérer les catégories uniques pour le filtre
  get categories(): string[] {
    return [...new Set(this.suggestions.map(s => s.category))];
  }
}
