/*
* Color Clicker
* Copyright @ Zack Bostian 2018
/
* FEATURES TO ADD:
/
/
*
/
/
/
/
*
/
/
/
*  Move events into own object.
/
*/


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
    // console.log(input);
    // console.log(divElementsWithClassItem);
      // replace 30 with userNumber
    for (var i = 0; i < input.value; i++) {
        if (input.value === 0 || input.value > 30) {
         return;
        }
        var divItem = document.createElement('div');
        divItem.classList.add('item');
        divItem.textContent = 'Click me!';
        divList.appendChild(divItem);
    }

    this.hideGenerateButton();
    // If there's 30 elements on the page hide the generate button.

  },

  hideGenerateButton: function() {
    var divElementsWithClassItem = document.getElementsByClassName('item')
    var button = document.getElementById('btn');
    if (divElementsWithClassItem.length === 30) {
      button.style.visibility = 'hidden';
    }

    // divElementsWithClassItem.length === 30
    //   ? button.style.visibility = 'hidden'
    //   : false

  },

  setupEventListeners: function() {
    var divList = document.getElementById('list');
    var header = document.getElementById('header');
    // Mouseover may be less physically intensive?
    divList.addEventListener('mouseover', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        el.style.background = this.generateHexColor();
        el.textContent = this.generateHexColor();
        el.style.color = '#fff';
      }
    }.bind(this));

    header.addEventListener('click', function(e) {
      var el = e.target;
      if (el.id === "btn") {
        this.renderElements();
      }
    }.bind(this));

  },

  // clickToRenderElements: function() {
  //   var button = document.getElementById('btn');
  //   button.addEventListener('click', this.renderElements);
  // }
}

// var eventListeners = {
//

//
// }

colorClicker.clickToRenderElements();
colorClicker.setupEventListeners();
