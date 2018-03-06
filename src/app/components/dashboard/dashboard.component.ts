import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { MainService } from '../../services/main.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [PostsService, MainService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  btcData: null;
  ethData: null;
  ltcData: null;
  user: null;
  bitcoin: null;

/*
  Chart.js options.
*/
  chartOptions = {
    responsive: true
  };

/*
  Chart data, numbers need to be replaced with the dollar values in relation to the dates.
*/
  chartData = [
    { data: [], label: 'Bitcoin' },
    { data: [], label: 'Ether' },
    { data: [], label: 'Litecoin' }
  ];

/*
  Chart labels that go on the x axis, need to be the dates returned by the JSON call.
*/
  chartLabels = [];

/*
  Colors.
*/
  chartColors = [
    { backgroundColor: 'rgba(39, 128, 227, 0.3)', borderColor: '#2780e3', pointBackgroundColor: '#fff',
    pointHoverBackgroundColor: '#2780e3', pointHoverBorderColor: '#fff' },
    { backgroundColor: 'rgba(20, 36, 255, 0.3)', borderColor: '#1424FF', pointBackgroundColor: '#fff',
    pointHoverBackgroundColor: '#1424FF', pointHoverBorderColor: '#fff' },
    { backgroundColor: 'rgba(36, 0, 240, 0.3)', borderColor: '#2400f0', pointBackgroundColor: '#fff',
    pointHoverBackgroundColor: '#2400f0', pointHoverBorderColor: '#fff' }
  ];

  public showUpdate = false;

  constructor(
    private postsService: PostsService,
    private mainService: MainService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentBtcPrice();
    this.currentEthPrice();
    this.currentLtcPrice();
    this.loadUser();
    this.getBtcData();
    this.getEthData();
    this.getLtcData();
  }

/*
  Current pricing of all cryptocurrency.
  Gets current price of the currency, defines the respective var as the response from the API call.
*/
  currentBtcPrice() {
    this.postsService.getBtcCurrentPrice()
      .subscribe(
      response => this.btcData = response,
      error => alert(error)
      );
  }

  currentEthPrice() {
    this.postsService.getEthCurrentPrice()
      .subscribe(
      response => this.ethData = response,
      error => alert(error)
      );
  }

  currentLtcPrice() {
    this.postsService.getLtcCurrentPrice()
      .subscribe(
      response => this.ltcData = response,
      error => alert(error)
      );
  }


/* Past 30 days pricing of all cryptocurrency. */
/*
  Retrieves the 30 day history for the cryptocurrency, passes the response (data) into the below onDataResponse functions.
*/
  getBtcData() {
    this.mainService.getBtcHistory()
      .subscribe(
      data => this.onBtcDataResponse(data),
      error => alert(error),
    );
  }

  getEthData() {
    this.mainService.getEthHistory()
      .subscribe(
      res => this.onEthDataResponse(res),
      error => alert(error),
    );
  }

  getLtcData() {
    this.mainService.getLtcHistory()
      .subscribe(
      res => this.onLtcDataResponse(res),
      error => alert(error),
    );
  }

/* Usage of the 30 days pricing of all cryptocurrency. */
/*
  Takes in the 30 day history response. For every key, pushes the key (date) to the
  ng2-charts array, chartLabels. For every value, pushes the value (closing price) to the ng2-charts array,
  chartData. Uses .slice() to properly update the chart.
*/
  onBtcDataResponse(data) {
    for (const key in data.bpi) {
      if (data.bpi.hasOwnProperty(key)) {
        this.chartLabels.push(key);
        this.chartData[0].data.push(data.bpi[key]);
        this.chartLabels = this.chartLabels.slice();
      }
    }
  }

  onEthDataResponse(res) {
    for (const key in res.Data) {
      if (res.Data.hasOwnProperty(key)) {
        this.chartData[1].data.push(res.Data[key].close);
        this.chartLabels = this.chartLabels.slice();
      }
    }
  }

  onLtcDataResponse(res) {
    for (const key in res.Data) {
      if (res.Data.hasOwnProperty(key)) {
        this.chartData[2].data.push(res.Data[key].close);
        this.chartLabels = this.chartLabels.slice();
      }
    }
  }


/*
  Loads the logged in user, throws error if unsuccessful.
*/
  loadUser() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

/*
  Created to allow users to update their bitcoin value in the MongoDB database.
  Changes the user's bitcoin value (representative of amount owned) to what is entered by the user.
  Functions to change ETH and LTC amounts could be written with a few variable changes.
*/
  bitcoinSubmit() {
    this.authService.bitcoinChange(this.bitcoin).subscribe(response => {
      this.flashMessage.show('Bitcoin amount changed! Please refresh the page to view the change.', {
        cssClass: 'alert-success',
        timeout: 5000
      });
    }, err => {
      console.log(err);
    });
  };

/*
  Toggle for showing bitcoinSubmit form.
*/
  changeShowUpdate() {
    this.showUpdate = true;
  }

/*
  Optional feature of ng2-Charts.
*/
  onChartClick() {
    //
  }

}
