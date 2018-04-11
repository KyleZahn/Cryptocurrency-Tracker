# Cryptocurrency-Tracker
A web application that utilizes the Coindesk API to relay up-to-date price information of the three largest cryptocurrencies. Users are able to create accounts, stored in MongoDB, to manage their cryptocurrency by receiving personalized portfolios.

## How it works
I created the front-end of Cryptocurrency Tracker with Angular 2 to design a Single-Page Application with responsive and customizable components.

The navbar, for example, will display differing items based upon the current user session.
```
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav navbar-right">
        <li [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a [routerLink]="['/']">HOME</a></li>
        <li *ngIf="authService.loggedIn()" [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a [routerLink]="['/dashboard']">DASHBOARD</a></li>
        <li *ngIf="!authService.loggedIn()" [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a [routerLink]="['/login']">LOGIN</a></li>
        <li *ngIf="!authService.loggedIn()" [routerLinkActive]="['active']" [routerLinkActiveOptions] = "{exact:true}"><a [routerLink]="['/register']">REGISTER</a></li>
        <li *ngIf="authService.loggedIn()"><a (click)="onLogoutClick()" href="#">LOGOUT</a></li>
      </ul>
    </div>
```

The most important component of the SPA is the dashboard. Each time the dashboard is loaded, GET requests are made to the Coindesk API to receieve and display up-to-date pricing information to the user.
```
  ngOnInit() {
    this.loadUser();
    this.currentBtcPrice();
    this.currentEthPrice();
    this.currentLtcPrice();
    this.getBtcData();
    this.getEthData();
    this.getLtcData();
  }
```

The user's information is loaded to display their personalized information. Their information (such as current amount of Cryptocurrency owned) is used to calculate their current portfolio value.
```
  loadUser() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }
```

The past 30 days closing prices are pushed to a chart, created with [ng2-charts](https://github.com/valor-software/ng2-charts), for easy analysis.
```
  onBtcDataResponse(data) {
    for (const key in data.bpi) {
      if (data.bpi.hasOwnProperty(key)) {
        this.chartLabels.push(key);
        this.chartData[0].data.push(data.bpi[key]);
        this.chartLabels = this.chartLabels.slice();
      }
    }
  }
```
