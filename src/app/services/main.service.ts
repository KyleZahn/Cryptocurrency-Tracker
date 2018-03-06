import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {
    constructor(private http: Http) { }

/*
    HTTP Requests, obtaining past 30 days closing prices on 3 cryptocurrencies.
*/
    // Bitcoin
    getBtcHistory(){
        return this.http.get('https://api.coindesk.com/v1/bpi/historical/close.json')
        .map(res => res.json());
    };

    // Ether
    getEthHistory() {
        return this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30')
        .map(res => res.json());
    };

    // Litecoin
    getLtcHistory() {
        return this.http.get('https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=30')
        .map(res => res.json());
    }

}
