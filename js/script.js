/*
* Color Picker
* Copyright @ Zack Bostian 2018

// FEATURES TO ADD:

// !! REFACTOR CODE !!

// 1. When user clicks button without typing in value
//    Show pop up bubble that says to enter a value
//    Can be a css element with an added class of some sort?

// 2. Set up localstorage

// 3 When you click a hex color make it so the entire viewport
//    displays that color with the ability to copy the text??

// 4. Add hex color text into middle of div
//  most likely need to embed a child element into it with the text

// 5. Hide the delete button until hovering oer the div wrapper element

// 6. Style it better, check out how others style their apps, etc.

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

      divList.appendChild(divWrapper);
    }
    input.value = "";
    input.focus();
    this.hideGenerateButton();
    this.showRenderedElementCount();
  },

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

    // Turn this into a forEach method
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
    return (itemCount.textContent = length + " " + util.pluralize(length, "item"));
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
  }
};

var eventListeners = {
  setupEventListeners: function() {
    var ENTER_KEY = 13;
    var divList = document.getElementById("list");
    var header = document.getElementById("header");
    // Mouseover may be less physically intensive?
    divList.addEventListener("mouseover", function(e) {
      var el = e.target;
      if (el.className === "item") {
        el.style.background = colorClicker.generateHexColor();
        el.textContent = colorClicker.generateHexColor();
        el.style.color = "#fff";
      }
    });

       // Deleting individual elements
    divList.addEventListener("click", function(e) {
      if (e.target.className === "crossout") {
        colorClicker.deleteAnElement(e);
      }
    });

    // Copy text to clipboard
    divList.addEventListener('dblclick', function(e) {
      if (e.target.className === 'item') {
        console.log('hey');
      }
    });

    header.addEventListener("click", function(e) {
      var el = e.target;
      if (el.id === "btn") {
        colorClicker.renderElements();
      }
    });

    header.addEventListener("keyup", function(e) {
      if (e.which === ENTER_KEY) {
        colorClicker.renderElements();
      }
    });

    header.addEventListener("click", function(e) {
      if (e.target.id === "btn-delete") {
        colorClicker.clearAll();
      }
    });


  }
};

eventListeners.setupEventListeners();
