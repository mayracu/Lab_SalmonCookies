'use strict';

// ***Creating the window into the DOM***
let locationSection = document.getElementById('locations');

console.dir(locationSection);

// *** Global Variables *** //
let hours = ['6am', '7am', '8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm', '7pm'];

const storesArray = [];

let salesTable;

// **** Helper Functions or Utilities **** //

// **creating table

function renderTable(){
  let table = document.createElement('table');
  locationSection.appendChild(table);
  // Apply table element to global variable salesTable.
  // This will allow that all table elements from render() can attach to this one table
  salesTable = table;
}


function renderHeader(){

  // Create row that will display hours
  let rowHeading = document.createElement('tr');
  salesTable.appendChild(rowHeading);

  // Create empty firs cell
  let cell = document.createElement('th');
  rowHeading.appendChild(cell);

  // Create for loop to display hours across rowHeading
  for (let i = 0; i < hours.length; i++){
    let hourHeading = document.createElement('th');
    hourHeading.textContent = hours[i];
    rowHeading.appendChild(hourHeading);
  }
  // Create last cell displaying text 'Daily Location Total'
  let totalCookiesSoldHeader = document.createElement('th');
  totalCookiesSoldHeader.textContent = 'Daily Location Total';
  rowHeading.appendChild(totalCookiesSoldHeader);

}

function renderFooter(){
  // Create row that will display hours
  let rowFooter = document.createElement('tr');
  salesTable.appendChild(rowFooter);

  //Create last cell displaying text 'Totals'
  let totalsFooter = document.createElement('th');
  totalsFooter.textContent = 'Totals';
  rowFooter.appendChild(totalsFooter);

}


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

  //Create row to display each store name and daily sales data
  let row = document.createElement('tr');
  salesTable.appendChild(row);

  // Create table header for name of store
  let th1Elem = document.createElement('th');
  th1Elem.textContent = this.storeName;
  row.appendChild(th1Elem);

  // Create table data to display daily sales of cookies
  for(let i = 0; i < this.cookiesPurchasedHourly.length; i++) {
    let tdElem = document.createElement('th');
    tdElem.textContent = this.cookiesPurchasedHourly[i];
    row.appendChild(tdElem);
  }
  // Create table data to display daily location totals
  let totalsElem = document.createElement('th');
  totalsElem.textContent = this.totalCookiesSold;
  row.appendChild(totalsElem);
};

// ****Executable code****

let Seattle = new Stores('Seattle', 23, 65, 6.3);

let Tokyo = new Stores('Tokyo', 3, 24, 1.2);

let Dubai = new Stores('Dubai', 11, 38, 3.7);

let Paris = new Stores('Paris', 20, 38, 2.3);

let Lima = new Stores('Lima', 2, 16, 4.6);

storesArray.push(Seattle, Tokyo, Dubai, Paris, Lima);

renderTable();
renderHeader();
renderAll();
renderFooter();

//console.log(Seattle, Tokyo, Dubai, Paris, Lima);

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
