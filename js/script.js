/*
* Color Clicker
* Copyright @ Zack Bostian 2018
/
* FEATURES TO ADD:
/
* When user clicks button without typing in value
/ Show pop up bubble that says to enter a value
/ Can be a css element with an added class of some sort?

*
/
*/

var util = {

  hexColorId: function() {
    var i, random;
    var id = '';

    for (i = 0; i < 12; i++) {
      random = Math.random() * 16 | 0;
      if (i === 4 || i === 8) {
        id += '-';
      }
      id += random.toString(16);
    }
    return id;
  },

  pluralize: function(count, word) {
    return count === 1 ? word : word + 's';
  },

  copyHexColorToClipboard: function() {
    //When text is selected
    //copy to clipboard
  },

};

var colorClicker = {

  generateHexColor: function() {
    var random;
    var id = '#';
    for (var i = 0; i < 6; i++) {
      random = Math.random() * 16 | 0;
      id += random.toString(16);
    }
    return id;
  },

  renderElements: function() {

    var input = document.getElementById('input');
    var divList = document.getElementById('list');

    for (var i = 0; i < input.value; i++) {

      if (input.value > 30) {
        return;
      }

      var divItem = document.createElement('div');
      divItem.classList.add('item');
      divItem.textContent = 'Click me!';
      divItem.setAttribute('id', util.hexColorId());
      divList.appendChild(divItem);
    }

    input.value = '';
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
    return divList;
  },

  deleteAllElements: function() {
    var divElementsWithClassItem = document.getElementsByClassName('item')
    var nodelistToArray = Array.from(divElementsWithClassItem);
    console.log(nodelistToArray);
    var length = nodelistToArray.length;
    //delete all elements
    // grab all elements
    // loop through array and delete the amount of elements based on it's length


  },

  hideGenerateButton: function() {
    var divElementsWithClassItem = document.getElementsByClassName('item')
    var button = document.getElementById('btn');
    if (divElementsWithClassItem.length === 30) {
      button.style.visibility = 'hidden';
    }
  },

  showRenderedElementCount: function() {
    var itemCount = document.getElementById('itemcount');
    var numberOfElements = document.getElementsByClassName('item');
    var length = numberOfElements.length;
    return itemCount.textContent = length + ' ' + util.pluralize(length, 'item');
  },

};

//   setupEventListeners: function() {
//     var divList = document.getElementById('list');
//     var header = document.getElementById('header');
//     // Mouseover may be less physically intensive?
//     divList.addEventListener('mouseover', function(e) {
//       var el = e.target;
//       if (el.className === 'item') {
//         el.style.background = this.generateHexColor();
//         el.textContent = this.generateHexColor();
//         el.style.color = '#fff';
//       }
//     }.bind(this));

//     header.addEventListener('click', function(e) {
//       var el = e.target;
//       if (el.id === "btn") {
//         this.renderElements();
//       }
//     }.bind(this));
//   }


var eventListeners = {

  setupEventListeners: function() {
    var ENTER_KEY = 13;
    var divList = document.getElementById('list');
    var header = document.getElementById('header');
    // Mouseover may be less physically intensive?
    divList.addEventListener('mouseover', function(e) {
      var el = e.target;
      console.log(this);
      if (el.className === 'item') {
        el.style.background = colorClicker.generateHexColor();
        el.textContent = colorClicker.generateHexColor();
        el.style.color = '#fff';
      }
    });

    header.addEventListener('click', function(e) {
      var el = e.target;
      if (el.id === "btn") {
        console.log(this);
        colorClicker.renderElements();
      }
    });

    header.addEventListener('keyup', function(e) {
      if (e.which === ENTER_KEY) {
        colorClicker.renderElements();
      }
    });

    header.addEventListener('click', function(e) {
      var el = e.target;
      if (el.id === 'btn-delete') {
        colorClicker.deleteAllElements();
      }
    });

  }
};

eventListeners.setupEventListeners();
