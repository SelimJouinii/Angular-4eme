import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;
  
  // Pour l'exemple, on recrée la liste (idéalement via un service)
  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: '...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptée', nbLikes: 10, isFavorite: false },
    { id: 2, title: 'Améliorer le système de réservation', description: '...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refuse', nbLikes: 0, isFavorite: false },
    { id: 3, title: 'Créer un système de récompenses', description: '...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refuse', nbLikes: 0, isFavorite: false },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: '...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', nbLikes: 0, isFavorite: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID depuis l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestion = this.suggestions.find(s => s.id === id);
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }
}