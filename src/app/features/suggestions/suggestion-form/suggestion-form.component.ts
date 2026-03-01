import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {  // Make sure this export exists
  suggestionForm!: FormGroup;
  categories: string[] = [
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

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date();
    const formattedDate = this.formatDate(today);

    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: formattedDate, disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const dateParts = formValue.date.split('/');
      const suggestionDate = new Date(
        parseInt(dateParts[2]), 
        parseInt(dateParts[1]) - 1, 
        parseInt(dateParts[0])
      );

      const newSuggestion = {
        id: 0,
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: suggestionDate,
        status: 'en_attente' as const,
        nbLikes: 0
      };

      this.suggestionService.addSuggestion(newSuggestion);
      this.router.navigate(['/suggestions']);
    }
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}