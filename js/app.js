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
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  getCookiesPurchasedHourly: function(){
    for (let i=0; i<14; i++){
      this.cookiesPurchasedHourly[i] = this.avgCookiesPerCust*this.getCustomersPerHour();//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  getTotalCookiesSold: function(){
    let cookies = 0;
    for (let i = 0; i < 14; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
    console.log (cookies);
    return this.totalCookiesSold;
  },


  render: function(){
    this.customersPerHour = this.getCustomersPerHour(); // this method call will populate the amount of customers per hour in Seattle
    this.cookiesPurchasedHourly = this.getCookiesPurchasedHourly(); // this method call will populate the amount of cookies purchased hourly in Seattle
    this.totalCookiesSold = this.getTotalCookiesSold(); // this method call will populate the amount of total cookies sold per day in Seattle

    // *** Creating element: section
    let sectionElement = document.createElement('article');

    // *** Add to DOM*** parent.appendChild(child)

    locationSection.appendChild(sectionElement);


    let locationHeading = document.createElement('h2');
    locationHeading.innerText = this.storeName;
    sectionElement.appendChild(locationHeading);

    let locationUL = document.createElement('ul');
    sectionElement.appendChild(locationUL);

    for (let i = 0; i < hours.length; i++){
      let hoursLI = document.createElement('li');
      hoursLI.innerText = hours[i];
      locationUL.appendChild(hoursLI);
    }


    // let locationUL = document.createElement;('ul');
    //locationSection.appendChild(locationUL);



  }
};



// *** Executable Code *** /

Seattle.render();
console.log(Seattle);
//Seattle.getCustomersPerHour();
//Seattle.getCookiesPurchasedHourly();
//Seattle.getTotalCookiesSold();
//console.log(Seattle);
