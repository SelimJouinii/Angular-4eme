export interface Suggestion {
  id?: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  status: 'acceptée' | 'refuse' | 'en_attente';
  nbLikes: number;
  isFavorite?: boolean;
}
