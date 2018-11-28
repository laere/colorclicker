/*
* Color Picker
* Copyright @ Zack Bostian 2018

// FEATURES TO ADD:

// !! REFACTOR CODE !!

// 2. Set up localstorage

// 5. Hide the delete button until hovering oer the div wrapper element

// 6. Option to change hex value to rgb values.

// If color is a certain brightness add dark outlining to text.
// Instead of hiding/showing toggle expanded color how about appending and removing element ?

*/


var util = {
  hexColorId: function() {
    var i, random;
    var id = '';
    for (i = 0; i < 12; i++) {
      random = (Math.random() * 16) | 0;
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
    //do a button instead of textarea
    var expandedColor = document.getElementById('expanded-color');
    var input = document.createElement('input');
    var expandedColorText = document.getElementById('expanded-color__text');
    var hexValue = expandedColorText.innerHTML;

    input.classList.add('copy-text');
    input.setAttribute('type', 'text');
    input.style.display = 'block';
    input.value = hexValue;

    expandedColor.appendChild(input);

    input.select();
    document.execCommand('copy');
    expandedColor.removeChild(input);

  },
  // localstorage
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data, ['className', 'tagName', 'childNodes']));
    } else {
      var store = localStorage.getItem(JSON.parse(namespace))
      return (store && JSON.stringify(store)) || [];
    }
  },

  saveElements: function() {

  },
};

var colorClicker = {
  generateHexColor: function() {
    var random;
    var id = '#';
    for (var i = 0; i < 6; i++) {
      random = (Math.random() * 16) | 0;
      id += random.toString(16);
    }
    return id;
  },
  // Nodelist doesnt update until after entire render function is finished executing.
  renderElements: function() {
    var input = document.getElementById('input');
    var divList = document.getElementById('list');
    var nodelist = Array.from(document.querySelectorAll('.item'));
    var popup = document.querySelector('.popup');
    // Add an animation to it?
    // Empty input or 0.
    if (input.value === '' && nodelist.length === 0) {
      popup.style.display = 'block';
      popup.style.animation = 'fadeIn 1s forwards';
    } else {
      popup.style.display = 'none';
    }
    for (var i = 0; i < input.value; i++) {
      if (input.value > 30) {
        input.value = '';
        input.focus();
        return;
      }
      var divItem = document.createElement('div');
      var divCrossout = document.createElement('button');
      var divWrapper = document.createElement('div');

      divWrapper.classList.add('item-wrapper');
      divWrapper.appendChild(divItem);

      divCrossout.classList.add('crossout');
      divCrossout.textContent = 'X';
      divCrossout.setAttribute('id', util.hexColorId());

      divWrapper.appendChild(divCrossout);

      divItem.classList.add('item');
      divItem.textContent = 'Click me!';
      divItem.setAttribute('id', util.hexColorId());

      divList.appendChild(divWrapper);

    }
    input.value = '';
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
  },
  // finds index in an array of elements based on ID
  // Pass in a nodelist arg if reusing.
  findElementIndex: function(el) {
    var nodelist = document.querySelectorAll('.crossout');
    var elementsArray = Array.from(nodelist);
    var id = el.id;
    var i = elementsArray.length;

    while (i--) {
      if (elementsArray[i].id === id) {
        return i;
      }
    }
  },

  deleteAnElement: function(e) {
    var nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    for (var i = 0; i < nodelist.length; i++) {
      var index = this.findElementIndex(e.target);
      if (i === index) {
        nodelist[i].parentNode.removeChild(nodelist[i]);
      }
    }
    this.showRenderedElementCount();
  },

  hideGenerateButton: function() {
    var nodelist = document.querySelectorAll('.item');
    var button = document.getElementById('btn');
    if (nodelist.length === 30) {
      button.style.display = 'none';
    }
  },

  showRenderedElementCount: function() {
    var itemCount = document.getElementById('itemcount');
    var nodelist = document.querySelectorAll('.item-wrapper');
    var length = nodelist.length;
    if (length === 0 ) {
      itemCount.textContent = length + ' ' + util.pluralize(length, 'item');
      return;
    }
    return itemCount.textContent = length + ' ' + util.pluralize(length, 'item');
  },

  clearAll: function() {
    var input = document.getElementById('input');
    var button = document.getElementById('btn');
    var nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    for (var i = 0; i < nodelist.length; i++) {
      nodelist[i].parentNode.removeChild(nodelist[i]);
    }
    // Want this to only run if there are elements in the nodelist
    if (nodelist.length > 0) {
      this.showRenderedElementCount();
    }
    button.style.display = 'inline-block';
    input.focus();
  },

  expandedColor: function(e) {
    var container = document.getElementById('container');
    var expandedColor = document.getElementById('expanded-color');
    var expandedColorText = document.getElementById('expanded-color__text');
    var colorClicked = e.target.style.background;
    var hexText = e.target.textContent;

    container.style.display = 'none'
    expandedColor.style.display = 'block';
    expandedColor.style.background = colorClicked;
    expandedColorText.textContent = hexText;

  },

  exitExpandedColor: function(e) {
    var container = document.getElementById('container');
    var expandedColor = document.getElementById('expanded-color');
    var expandedColorText = document.getElementById('expanded-color__text');

    container.style.display = ''
    expandedColorText.style.color = '#fff';
    expandedColor.style.display = 'none';

  }
};

var eventListeners = {
  setupEventListeners: function() {
    var ENTER_KEY = 13;
    var container = document.getElementById('container');

    container.addEventListener('mouseover', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        el.style.background = colorClicker.generateHexColor();
        el.textContent = colorClicker.generateHexColor();
        el.style.color = '#fff';
      }
    });

    container.addEventListener('click', function(e) {
      if (e.target.className === 'crossout') {
        colorClicker.deleteAnElement(e);
      }
    });

    document.body.addEventListener('click', function(e) {
      if (e.target.id === 'btn-copy') {
        util.copyHexColorToClipboard();
      }
    });

    container.addEventListener('click', function(e) {
      if (e.target.className === 'item') {
        colorClicker.expandedColor(e);
      }
    });

    container.addEventListener('click', function(e) {
      var el = e.target;
      if (el.id === 'btn') {
        colorClicker.renderElements();
      }
    });

    container.addEventListener('keyup', function(e) {
      if (e.which === ENTER_KEY) {
        colorClicker.renderElements();
      }
    });

    container.addEventListener('click', function(e) {
      if (e.target.id === 'btn-delete') {
        colorClicker.clearAll();
      }
    });

    document.body.addEventListener('click', function(e) {
      if (e.target.id === 'expanded-color') {
        colorClicker.exitExpandedColor();
      }
    });
  }
};

eventListeners.setupEventListeners();
window.input.focus();
