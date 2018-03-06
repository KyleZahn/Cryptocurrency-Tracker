import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
    constructor(private http: Http) { }

/*
    HTTP Requests, obtaining current pricing on 3 cryptocurrencies.
*/
    // BTC
    getBtcCurrentPrice() {
        return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,GBP')
        .map(res => res.json());
    }

    // ETH
    getEthCurrentPrice() {
        return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,GBP')
        .map(res => res.json());
    }

    // LTC
    getLtcCurrentPrice() {
        return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD,EUR,GBP')
        .map(res => res.json());
    }

}
