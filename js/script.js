/*
* Color Picker
* Copyright @ Zack Bostian 2018

// FEATURES TO ADD:

// !! REFACTOR CODE !!

// 2. Set up localstorage

// 4. Add hex color text into middle of div
//  most likely need to embed a child element into it with the text

// 5. Hide the delete button until hovering oer the div wrapper element

// 6. Option to change hex value to rgb values.

*/

var util = {
  hexColorId: function() {
    var i, random;
    var id = "";

    for (i = 0; i < 12; i++) {
      random = (Math.random() * 16) | 0;
      if (i === 4 || i === 8) {
        id += "-";
      }
      id += random.toString(16);
    }
    return id;
  },

  pluralize: function(count, word) {
    return count === 1 ? word : word + "s";
  },

  copyHexColorToClipboard: function() {
    //When text is selected
    //copy to clipboard
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
    // var nodelist = Array.from(document.querySelectorAll('.item-wrapper'));
    // this.store('colors', nodelist);
  },
};

var colorClicker = {
  generateHexColor: function() {
    var random;
    var id = "#";
    for (var i = 0; i < 6; i++) {
      random = (Math.random() * 16) | 0;
      id += random.toString(16);
    }
    return id;
  },
  // Nodelist doesnt update until after entire render function is finished executing.
  renderElements: function() {
    var input = document.getElementById("input");
    var divList = document.getElementById("list");
    var nodelist = Array.from(document.querySelectorAll(".item"));
    var popup = document.querySelector('.popup');

    // Add an animation to it?
    // Empty input or 0.
    if (input.value === '') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }


    for (var i = 0; i < input.value; i++) {
      if (input.value > 30) {
        input.value = "";
        input.focus();
        return;
      }


      var divItem = document.createElement("div");
      var divCrossout = document.createElement("button");
      var divWrapper = document.createElement("div");


      divWrapper.classList.add("item-wrapper");
      divWrapper.appendChild(divItem);

      divCrossout.classList.add("crossout");
      divCrossout.textContent = "X";
      divCrossout.setAttribute("id", util.hexColorId());

      divWrapper.appendChild(divCrossout);

      divItem.classList.add("item");
      divItem.textContent = "Click me!";
      divItem.setAttribute('id', util.hexColorId());
      divItem.setAttribute('toggle', false);


      divList.appendChild(divWrapper);
    }
    input.value = "";
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
  },
  // finds index in an array of elements based on ID
  // Pass in a nodelist arg if reusing.
  findElementIndex: function(el) {
    var nodelist = document.querySelectorAll(".crossout");
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
    var nodelist = Array.from(document.querySelectorAll(".item-wrapper"));
    // Grab index from findElementIndex - refers to index of the buttons
    // If the index from findElementIndex is equal to the index of the items nodelist
    // Hide the item

    // Turn this into a forEach method?
    for (var i = 0; i < nodelist.length; i++) {
      var index = this.findElementIndex(e.target);
      if (i === index) {
        nodelist[i].parentNode.removeChild(nodelist[i]);
      }
    }
    this.showRenderedElementCount();
  },

  hideGenerateButton: function() {
    var nodelist = document.querySelectorAll(".item");
    var button = document.getElementById("btn");
    if (nodelist.length === 30) {
      button.style.display = "none";
    }
  },

  showRenderedElementCount: function() {
    var itemCount = document.getElementById("itemcount");
    var nodelist = document.querySelectorAll(".item-wrapper");
    var length = nodelist.length;
    return (itemCount.textContent =
      length + " " + util.pluralize(length, "item"));
  },

  clearAll: function() {
    var button = document.getElementById("btn");
    var divList = document.getElementById("list");
    var nodelist = Array.from(document.querySelectorAll(".item-wrapper"));
    for (var i = 0; i < nodelist.length; i++) {
      nodelist[i].parentNode.removeChild(nodelist[i]);
    }
    // Want this to only run if there are elements in the nodelist
    if (nodelist.length > 0) {
      this.showRenderedElementCount();
    }
    button.style.display = "inline-block";
  },

  expandedColor: function(e) {
      var container = document.getElementById('container');
      var expandedColor = document.getElementById('expanded-color');
      var expandedColorText = document.getElementById('expanded-color__text');
      var exitMessage = document.getElementById('exitmessage');
      var el = e.target;
      var colorClicked = el.style.background;
      var hexText = el.textContent;


      container.style.display = 'none'
      expandedColor.style.display = 'block';
      expandedColor.style.background = colorClicked;
      expandedColorText.textContent = hexText;

    },


  exitExpandedColor: function(e) {
      var container = document.getElementById('container');
      var expandedColor = document.getElementById('expanded-color');
      var expandedColorText = document.getElementById('expanded-color__text');
      var exitMessage = document.getElementById('exitmessage');

      container.style.display = ''
      expandedColor.style.display = 'none';

    }
};

var eventListeners = {
  setupEventListeners: function() {
    var ENTER_KEY = 13;
    var container = document.getElementById('container');
    // Mouseover may be less physically intensive?
    container.addEventListener("mouseover", function(e) {
      var el = e.target;
      if (el.className === "item") {
        el.style.background = colorClicker.generateHexColor();
        el.textContent = colorClicker.generateHexColor();
        el.style.color = "#fff";
      }
    });

    // Deleting individual elements
    container.addEventListener("click", function(e) {
      if (e.target.className === "crossout") {
        colorClicker.deleteAnElement(e);
      }
    });

    // Copy text to clipboard
    // divList.addEventListener('dblclick', function(e) {
    //   if (e.target.className === 'item') {
    //     console.log('hey');
    //   }
    // });

    container.addEventListener('click', function(e) {
      if (e.target.className === 'item') {
        colorClicker.expandedColor(e);
      }
    });

    container.addEventListener("click", function(e) {
      var el = e.target;
      if (el.id === "btn") {
        colorClicker.renderElements();
      }
    });

    container.addEventListener("keyup", function(e) {
      if (e.which === ENTER_KEY) {
        colorClicker.renderElements();
      }
    });

    container.addEventListener("click", function(e) {
      if (e.target.id === "btn-delete") {
        colorClicker.clearAll();
      }
    });

    // container.addEventListener('click', function(e) {
    //   if (e.target.id === 'btn__save') {
    //     util.saveElements();
    //   }
    // });

    document.body.addEventListener('click', function(e) {
        if (e.target.id === 'expanded-color') {
          colorClicker.exitExpandedColor();
        }
      });

  }
};

eventListeners.setupEventListeners();
