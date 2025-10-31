export interface Category {
  id: 'movies' | 'concerts' | 'flights' | 'sports';
  name: string;
  description: string;
  imageTheme: string;
}

export interface ListingItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price?: number;
}

export interface MovieDetails {
  synopsis: string;
  cast: string[];
  director: string;
  duration: string;
  rating: string;
}

export interface ConcertDetails {
  artistBio: string;
  venue: string;
  date: string;
  popularSongs: string[];
}

export interface FlightDetails {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  layovers: string;
  aircraft: string;
}

export interface SportsDetails {
  match: string;
  league: string;
  venue: string;
  date: string;
  teams: string[];
}


export type ItemDetails = MovieDetails | ConcertDetails | FlightDetails | SportsDetails;

export interface BookingDetails {
  item: ListingItem;
  category: Category;
  tickets: number;
  name: string;
  email: string;
  paymentMethod: string;
}

export type View = 'home' | 'listing' | 'detail' | 'confirmation';