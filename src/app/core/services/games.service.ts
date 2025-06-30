import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface GameDetails extends Game {
  description: string;
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots?: Array<{
    id: number;
    image: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api';
  private readonly API_KEY = 'ad77fe5698msh76fbb73adb52f02p1d02bdjsnc89d42a2dc39';
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': this.API_KEY,
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    })
  };

  constructor(private http: HttpClient) {}

  getGamesByCategory(category: string): Observable<Game[]> {
    this.loadingSubject.next(true);
    return this.http.get<Game[]>(`${this.API_URL}/games?category=${category}`, this.httpOptions)
      .pipe(
        tap(() => this.loadingSubject.next(false))
      );
  }

  getGameDetails(id: number): Observable<GameDetails> {
    this.loadingSubject.next(true);
    return this.http.get<GameDetails>(`${this.API_URL}/game?id=${id}`, this.httpOptions)
      .pipe(
        tap(() => this.loadingSubject.next(false))
      );
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}

// Add tap import
import { tap } from 'rxjs/operators';