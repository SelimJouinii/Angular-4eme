import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionsService, Suggestion } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId: number | null = null;
  
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
    private suggestionService: SuggestionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
    this.suggestionId = this.route.snapshot.params['id'];
    if (this.suggestionId) {
      this.isEditMode = true;
      this.loadSuggestionForEdit(this.suggestionId);
    }
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
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  loadSuggestionForEdit(id: number): void {
    // This should be getSuggestionById
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data: Suggestion) => {
        // Format date for display if it exists
        const formData: any = {
          title: data.title,
          description: data.description,
          category: data.category,
          status: data.status || 'en attente'
        };
        
        // Handle date if present
        if (data.date) {
          const dateObj = new Date(data.date);
          formData.date = this.formatDate(dateObj);
        }
        
        this.suggestionForm.patchValue(formData);
      },
      error: (error: any) => {
        console.error('Error loading suggestion:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const suggestionData = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        status: 'en attente',
        nbLikes: 0
      };

      if (this.isEditMode && this.suggestionId) {
        // Update existing suggestion - should be updateSuggestion
        this.suggestionService.updateSuggestion(this.suggestionId, suggestionData).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (error: any) => {
            console.error('Error updating suggestion:', error);
          }
        });
      } else {
        // Add new suggestion - should be addSuggestion
        this.suggestionService.addSuggestion(suggestionData).subscribe({
          next: () => {
            this.router.navigate(['/suggestions']);
          },
          error: (error: any) => {
            console.error('Error adding suggestion:', error);
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/suggestions']);
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.suggestionForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}