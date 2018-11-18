/*
* Color Clicker
* Copyright @ Zack Bostian 2018
/
* FEATURES TO ADD:
/
* When user clicks button without typing in value
/ Show pop up bubble that says to enter a value
/ Can be a css element with an added class of some sort?
/
/ Ability to clear all elements.
*/
// If user enters a number into the input that makes the total amount of elements > 30, exit the function

//Store elements to local storage
// retrieve elements in local storage

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
  // localstorage
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var stor = localStorage.getItem(namespace);
      return localStorage.getitem(store && JSON.parse(store)) || [];
    }
  }

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

        var divItem = document.createElement('div');
        var divCrossout = document.createElement('button');
        var divWrapper = document.createElement('div');

        divWrapper.classList.add('item-wrapper')
        divWrapper.appendChild(divItem)

        divCrossout.classList.add('crossout');
        divCrossout.textContent = 'X';
        divCrossout.setAttribute('id', util.hexColorId());
        divWrapper.appendChild(divCrossout);

        divItem.classList.add('item');
        divItem.textContent = 'Click me!';
        divList.appendChild(divWrapper);
    }

    input.value = '';
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
    this.render();

  },

  findElementIndex: function(el) {
    var nodelist = document.querySelectorAll('.crossout')
    var elementsArray = Array.from(nodelist);
    var id = el.id;
    var i = elementsArray.length;
    console.log(elementsArray);

    while (i--) {
      if (elementsArray[i].id === id) {
        console.log('this is ' + i);
        return i;
      }
    }
  },

  deleteAnElement: function(e) {
    var nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    // Grab index from findElementIndex - refers to index of the buttons which is really the same as the item
    // However we click the crossout button to get the index of the item position to begin with.
    // If the index from findElementIndex is equal to the index of the item in the nodelist
    // Find the parentNode and removeChild the node itself.

    // Turn this into a forEach method
    for (var i = 0; i < nodelist.length; i++) {
      var index = this.findElementIndex(e.target);
      console.log(index);
      if (i === index) {
        nodelist[i].parentNode.removeChild(nodelist[i]);
       }
    }
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

  clearAll: function() {
    console.log('clear all button')
  },
};



var eventListeners = {

  setupEventListeners: function() {
    var ENTER_KEY = 13;
    var divList = document.getElementById('list');
    var header = document.getElementById('header');
    // Mouseover may be less physically intensive?
    divList.addEventListener('mouseover', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        el.style.background = colorClicker.generateHexColor();
        el.textContent = colorClicker.generateHexColor();
        el.style.color = '#fff';
      }
    });

    divList.addEventListener('click', function(e) {
      if (e.target.className === 'crossout') {
        colorClicker.deleteAnElement(e);
      }
    });

    header.addEventListener('click', function(e) {
      var el = e.target;
      if (el.id === "btn") {
        colorClicker.renderElements();
      }
    });

    header.addEventListener('keyup', function(e) {
      if (e.which === ENTER_KEY) {
        colorClicker.renderElements();
      }
    });

    header.addEventListener('click', function(e) {
      if (e.target.id === 'btn-delete') {
        colorClicker.clearAll();
      }
    });

  }
};

eventListeners.setupEventListeners();
