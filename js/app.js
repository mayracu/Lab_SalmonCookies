'use strict';

// ***Creating the window into the DOM***
let locationSection = document.getElementById('locations');

console.dir(locationSection);

// *** Global Variables *** //
let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

// *** Helper Functions or Utilities *** //


// *** Object Literals *** //

let Seattle = {
  storeName:'Seattle',
  minHourlyCust: 23,
  maxHourlyCust: 65,
  avgCookiesPerCust: 6.3,
  customersPerHour: 0,
  cookiesPurchasedHourly: [],
  totalCookiesSold: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(23, 65);
  },

  getCookiesPurchasedHourly: function(){
    for (let i=0; i<14; i++){
      this.cookiesPurchasedHourly[i] = this.avgCookiesPerCust*this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
  },

  getTotalCookiesSold: function(){
    let cookies = 0;
    for (let i = 0; i < 14; i++){
      cookies = cookies + Number(this.cookiesPurchasedHourly[i]);
    }
    console.log (cookies);
    return cookies;
  },


  render: function(){
    this.customersPerHour = this.getCustomersPerHour(); // this method call will populate the amount of customers per hour in Seattle
    this.cookiesPurchasedHourly = this.getCookiesPurchasedHourly(); // this method call will populate the amount of cookies purchased hourly in Seattle
    this.totalCookiesSold = this.getTotalCookiesSold(); // this method call will populate the amount of total cookies sold per day in Seattle

    // *** Creating element: section
    let sectionElem = document.createElement('section');

    // *** Add to DOM*** parent.appendChild(child)

    locationSection.appendChild(sectionElem);

    let locationHeading = document.createElement('h2');
    locationHeading.innerText = this.storeName;
    sectionElem.appendChild(locationHeading);



  }
};



// *** Executable Code *** /

Seattle.render();
Seattle.getCustomersPerHour();
Seattle.getCookiesPurchasedHourly();
Seattle.getTotalCookiesSold();
console.log(Seattle);
