/*
* Color Picker
* Copyright @ Zack Bostian 2018

// FEATURES TO ADD:

// !! REFACTOR CODE !!
    // Opt for get methods over queryselector

// 6. Option to change hex value to rgb values.

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

  backgroundStyle: function(el) {
    el.style.background = colorClicker.generateHexColor();
    el.textContent = colorClicker.generateHexColor();
    el.style.color = '#fff';
  },

  copyHexColorToClipboard: function() {
    //do a button instead of textarea
    var expandedColor = document.getElementById('expanded-color'),
        input = document.createElement('input'),
        expandedColorText = document.getElementById('expanded-color__text'),
        hexValue = expandedColorText.innerHTML;

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
    var list = document.getElementById('list');
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, data);
    } else {
      var colors = localStorage.getItem(namespace)
      // if (data === undefined) {
      //   console.log('test');
      //   list.innerHTML = '';
      // }
      list.innerHTML = colors;
    }
  },
};

var colorClicker = {
  generateHexColor: function() {
    var random,
        id = '#';
    for (var i = 0; i < 6; i++) {
      random = (Math.random() * 16) | 0;
      id += random.toString(16);
    }
    return id;
  },
  // Nodelist doesnt update until after entire render function is finished executing.
  renderElements: function() {
    var input = document.getElementById('input'),
        colorElementList = document.getElementById('list'),
        nodelist = Array.from(document.querySelectorAll('.item')),
        popup = document.querySelector('.popup');
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
      var colorItem = document.createElement('div'),
          itemDeleteButton = document.createElement('button'),
          colorItemWrapper = document.createElement('div');


      colorItemWrapper.classList.add('item-wrapper');
      colorItemWrapper.appendChild(colorItem);

      itemDeleteButton.classList.add('crossout');
      itemDeleteButton.textContent = 'X';
      itemDeleteButton.setAttribute('id', util.hexColorId());

      colorItemWrapper.appendChild(itemDeleteButton);

      colorItem.classList.add('item');
      colorItem.textContent = 'Hover me!';
      colorItem.setAttribute('id', util.hexColorId());


      colorElementList.appendChild(colorItemWrapper);

    }
    input.value = '';
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
    util.store('colors', colorElementList.innerHTML);
  },
  // finds index in an array of elements based on ID
  // Pass in a nodelist arg if reusing.
  findElementIndex: function(el) {
    var nodelist = document.querySelectorAll('.crossout'),
        elementsArray = Array.from(nodelist),
        id = el.id,
        i = elementsArray.length;

    while (i--) {
      if (elementsArray[i].id === id) {
        return i;
      }
    }
  },

  deleteAnElement: function(e) {
    var list = document.getElementById('list'),
        nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    for (var i = 0; i < nodelist.length; i++) {
      var index = this.findElementIndex(e.target);
      if (i === index) {
        nodelist[i].parentNode.removeChild(nodelist[i]);
      }
    }
    this.showRenderedElementCount();
    util.store('colors', list.innerHTML);
  },

  hideGenerateButton: function() {
    var nodelist = document.querySelectorAll('.item'),
        button = document.getElementById('btn');
    if (nodelist.length === 30) {
      button.style.display = 'none';
    }
  },

  showRenderedElementCount: function() {
    var itemCount = document.getElementById('itemcount'),
        nodelist = document.querySelectorAll('.item-wrapper'),
        length = nodelist.length;
    if (length === 0 ) {
      itemCount.textContent = length + ' ' + util.pluralize(length, 'item');
      return;
    }
    return itemCount.textContent = length + ' ' + util.pluralize(length, 'item');
  },

  clearAll: function() {
    var input = document.getElementById('input')
        button = document.getElementById('btn'),
        list = document.getElementById('list'),
        nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    for (var i = 0; i < nodelist.length; i++) {
      nodelist[i].parentNode.removeChild(nodelist[i]);
    }
    // Want this to only run if there are elements in the nodelist
    if (nodelist.length > 0) {
      this.showRenderedElementCount();
    }
    util.store('colors', list.innerHTML);
    input.focus();

  },

  expandedColor: function(e) {
    var container = document.getElementById('container'),
        expandedColor = document.getElementById('expanded-color'),
        expandedColorText = document.getElementById('expanded-color__text'),
        colorClicked = e.target.style.background,
        hexText = e.target.textContent;

    container.style.display = 'none'
    expandedColor.style.display = 'block';
    expandedColor.style.background = colorClicked;
    expandedColorText.textContent = hexText;

  },

  exitExpandedColor: function(e) {
    var container = document.getElementById('container'),
        expandedColor = document.getElementById('expanded-color'),
        expandedColorText = document.getElementById('expanded-color__text');

    container.style.display = ''
    expandedColorText.style.color = '#fff';
    expandedColor.style.display = 'none';
  }
};

var eventListeners = {

  setupEventListeners: function() {
    var ENTER_KEY = 13,
        ESC_KEY = 27,
        container = document.getElementById('container'),
        input = document.getElementById('input');

    container.addEventListener('mouseover', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        util.backgroundStyle(e.target);
      }
    });

    container.addEventListener('click', function(e) {
      if (e.target.className === 'crossout') {
        colorClicker.deleteAnElement(e);
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

      if (e.which === ESC_KEY) {
        input.blur();
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

    document.body.addEventListener('click', function(e) {
      if (e.target.id === 'btn-copy') {
        util.copyHexColorToClipboard();
      }
    });

    window.addEventListener('load', function() {
      util.store('colors');
      colorClicker.showRenderedElementCount();
    })
  }
};

eventListeners.setupEventListeners();
