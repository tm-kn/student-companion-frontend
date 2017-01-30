import { Place } from './place';

export class PlaceCategory {
  id: number;
  name: string;
  slug: string;
  parent: PlaceCategory;
  category_children: PlaceCategory[];
  places: Place[];
}
