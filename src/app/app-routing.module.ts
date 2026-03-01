import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component'; // Import HomeComponent
import { SuggestionListComponent } from './features/suggestions/suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './features/suggestions/suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, // Now home shows the welcome page
  { path: 'suggestions', component: SuggestionListComponent },
  { path: 'suggestions/new', component: SuggestionFormComponent },
  { path: 'suggestion/:id', component: SuggestionDetailsComponent },
  { path: 'add-suggestion', component: SuggestionFormComponent },
  { path: 'edit-suggestion/:id', component: SuggestionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }