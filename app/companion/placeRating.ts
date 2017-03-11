import { User } from './user';

export class PlaceRating {
  id: number;
  user: User;
  description: string;
  rating: number;
  max_rating: number;
  rated_at: Date;
}
