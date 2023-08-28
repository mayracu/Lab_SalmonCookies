'use strict';

// ***Creating the window into the DOM***
let locationSection = document.getElementById('locations');

console.dir(locationSection);

// *** Global Variables *** //
let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

const storesArray = [];

// *** Helper Functions or Utilities *** //

function renderAll(){
  for (let i = 0; i < storesArray.length; i++){
    storesArray[i].render();
  }
}

// **** CONSTRUCTOR FUNCTION ****

function Stores(storeName, minHourlyCust, maxHourlyCust, avgCookiesPerCust){
  this.storeName = storeName;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.customersPerHour = 0;
  this.cookiesPurchasedHourly = [];
  this.totalCookiesSold = 0;
}

// **** PROTOTYPE METHODS ****

Stores.prototype.randomCustomersPerHourGenerator = function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

Stores.prototype.getCustomersPerHour = function(){
  this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
  return this.customersPerHour;
};

Stores.prototype.getCookiesPurchasedHourly = function(){
  for (let i=0; i<hours.length; i++){
    this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());
  }
  return this.cookiesPurchasedHourly;
};

Stores.prototype.getTotalCookiesSold = function(){
  for (let i = 0; i < hours.length; i++){
    this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
  }
  return this.totalCookiesSold;
};

Stores.prototype.render = function(){
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
    hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
    locationUL.appendChild(hoursLI);
  }

  let cookieTotal = document.createElement('li');
  cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
  locationUL.appendChild(cookieTotal);

};






// ****Executable code****

let Seattle = new Stores('Seattle', 23, 65, 6.3);

let Tokyo = new Stores('Tokyo', 3, 24, 1.2);

let Dubai = new Stores('Dubai', 11, 38, 3.7);

let Paris = new Stores('Paris', 20, 38, 2.3);

let Lima = new Stores('Lima', 2, 16, 4.6);

storesArray.push(Seattle, Tokyo, Dubai, Paris, Lima);

renderAll();

console.log(Seattle, Tokyo, Dubai, Paris, Lima);
/*




// *** Object Literals *** //

let Seattle = {
  storeName:'Seattle',
  minHourlyCust: 23,
  maxHourlyCust: 65,
  avgCookiesPerCust: 6.3,
  customersPerHour: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  cookiesPurchasedHourly: [],
  getCookiesPurchasedHourly: function(){
    for (let i=0; i<hours.length; i++){
      this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  totalCookiesSold: 0,
  getTotalCookiesSold: function(){
    for (let i = 0; i < hours.length; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
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
      hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
      locationUL.appendChild(hoursLI);
    }

    let cookieTotal = document.createElement('li');
    cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
    locationUL.appendChild(cookieTotal);

  }
};

let Tokyo = {
  storeName:'Tokyo',
  minHourlyCust: 3,
  maxHourlyCust: 24,
  avgCookiesPerCust: 1.2,
  customersPerHour: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  cookiesPurchasedHourly: [],
  getCookiesPurchasedHourly: function(){
    for (let i=0; i<hours.length; i++){
      this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  totalCookiesSold: 0,
  getTotalCookiesSold: function(){
    for (let i = 0; i < hours.length; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
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
      hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
      locationUL.appendChild(hoursLI);
    }

    let cookieTotal = document.createElement('li');
    cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
    locationUL.appendChild(cookieTotal);

  }
};



let Dubai = {
  storeName:'Dubai',
  minHourlyCust: 11,
  maxHourlyCust: 38,
  avgCookiesPerCust: 3.7,
  customersPerHour: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  cookiesPurchasedHourly: [],
  getCookiesPurchasedHourly: function(){
    for (let i=0; i<hours.length; i++){
      this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  totalCookiesSold: 0,
  getTotalCookiesSold: function(){
    for (let i = 0; i < hours.length; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
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
      hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
      locationUL.appendChild(hoursLI);
    }

    let cookieTotal = document.createElement('li');
    cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
    locationUL.appendChild(cookieTotal);

  }
};


let Paris = {
  storeName:'Paris',
  minHourlyCust: 20,
  maxHourlyCust: 38,
  avgCookiesPerCust: 2.3,
  customersPerHour: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  cookiesPurchasedHourly: [],
  getCookiesPurchasedHourly: function(){
    for (let i=0; i<hours.length; i++){
      this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  totalCookiesSold: 0,
  getTotalCookiesSold: function(){
    for (let i = 0; i < hours.length; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
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
      hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
      locationUL.appendChild(hoursLI);
    }

    let cookieTotal = document.createElement('li');
    cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
    locationUL.appendChild(cookieTotal);

  }
};

let Lima = {
  storeName:'Lima',
  minHourlyCust: 2,
  maxHourlyCust: 16,
  avgCookiesPerCust: 4.6,
  customersPerHour: 0,

  randomCustomersPerHourGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  },
  getCustomersPerHour: function(){
    this.customersPerHour = this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    return this.customersPerHour;
  },

  cookiesPurchasedHourly: [],
  getCookiesPurchasedHourly: function(){
    for (let i=0; i<hours.length; i++){
      this.cookiesPurchasedHourly[i] = Math.ceil(this.avgCookiesPerCust*this.getCustomersPerHour());//this.randomCustomersPerHourGenerator(this.minHourlyCust, this.maxHourlyCust);
    }
    return this.cookiesPurchasedHourly;
  },

  totalCookiesSold: 0,
  getTotalCookiesSold: function(){
    for (let i = 0; i < hours.length; i++){
      this.totalCookiesSold = this.totalCookiesSold + Number(this.cookiesPurchasedHourly[i]);
    }
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
      hoursLI.innerText = `${hours[i]}: ${this.cookiesPurchasedHourly[i]} cookies`;
      locationUL.appendChild(hoursLI);
    }

    let cookieTotal = document.createElement('li');
    cookieTotal.innerText = `Total Sales: ${this.totalCookiesSold} cookies`;
    locationUL.appendChild(cookieTotal);

  }
};
// *** Executable Code *** /

Seattle.render();
Tokyo.render();
Dubai.render();
Paris.render();
Lima.render();
console.log(Seattle);
//Seattle.getCustomersPerHour();
//Seattle.getCookiesPurchasedHourly();
//Seattle.getTotalCookiesSold();
// console.log(Seattle);
*/
