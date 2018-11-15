/*
* Color Clicker
* Copyright @ Zack Bostian 2018
/
* FEATURES TO ADD:
/
/
* Input to specify amount of items to create.
/
/    -If 0 elements exit function/do nothing
/    -Input text MUST be a number and MUST be required
/
* Button to GENERATE the div items
/   -Seperate event listener
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
    // var divElementsWithClassItem = document.getElementsByClassName('item');
    // console.log(divElementsWithClassItem);
      // replace 30 with userNumber
      for (var i = 0; i < input.value; i++) {
         // Child nodes to divList element
         if (input.value === 0 || input.value > 30) {
          return;
         }
           var divItem = document.createElement('div');
           divItem.classList.add('item');
           divItem.textContent = 'Click me!';
           divList.appendChild(divItem);
      }

    input.value = '';
    input.focus();
  },

  setupEventListeners: function() {
    var divList = document.getElementById('list');
    // Mouseover may be less physically intensive?
    divList.addEventListener('mouseover', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        el.style.background = this.generateHexColor();
        el.textContent = this.generateHexColor();
        el.style.color = '#fff';
      }
    }.bind(this));
  },

  clickToRenderElements: function() {
    var button = document.getElementById('btn');

    button.addEventListener('click', this.renderElements);
  }

}

colorClicker.clickToRenderElements();
colorClicker.setupEventListeners();
