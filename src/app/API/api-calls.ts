import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CoinloreApiResponse } from './coinlore/coinloreApiResponse';
import { CryptoCoin } from '../models/finance/cryptoCoin';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiCalls {
  private coinloreUrl = environment.coinloreUrl;
  coinloreApiResponse?: CoinloreApiResponse;
  cryptoCoins: CryptoCoin[] = [];

  private http = inject(HttpClient);

  loadCoinloreData(): Observable<CoinloreApiResponse> {
    return this.http.get<CoinloreApiResponse>(this.coinloreUrl);
  }
}
