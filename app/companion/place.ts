import { PlaceCategory } from './placeCategory';
import { PlaceComment } from './placeComment';
import { PlaceRating } from './placeRating';
import { PlaceTag } from './placeTag';
import { PlaceImage } from './placeImage';

export class Place {
  id: number;
  name: string;
  slug: string;
  place_comments: PlaceComment[];
  place_ratings: PlaceRating[];
  categories: number[];
  categories_data: PlaceCategory[];
  tags: PlaceTag[];
  place_images: PlaceImage[];
  is_visible: boolean;
  google_places_id: string;
  description: string;
  website: string;
  address: string;
  telephone_number: string;
  facebook_handle: string;
  twitter_handle: string;
  student_discount: string;
  opening_times: string;
  price_level: string;
}
