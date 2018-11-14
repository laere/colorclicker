var colorPicker = {

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
    var divList = document.getElementById('list');
      for (var i = 0; i < 15; i++) {
         // Child nodes to divList element
         var divItem = document.createElement('div');
         divItem.classList.add('item');
         divItem.textContent = 'Click me!';
         //divItem.style.background = this.generateHexColor();
         divList.appendChild(divItem);
      }
  },

  setupEventListeners: function() {
    var divList = document.getElementById('list');
    // Mouseover may be less physically intensive?
    divList.addEventListener('click', function(e) {
      var el = e.target;
      if (el.className === 'item') {
        el.style.background = this.generateHexColor();
        el.textContent = this.generateHexColor();
        el.style.color = '#fff';
      }
    }.bind(this));
  }

}

colorPicker.renderElements();
colorPicker.setupEventListeners();
