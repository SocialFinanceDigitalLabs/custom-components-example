var XHello = Object.create(HTMLElement.prototype)

XHello.render = function() {
  var root = this.createShadowRoot()
  var name = this.name
  root.innerHTML = `
    I'd love to say hello to you <b>${name}</b> <button>&#8681;</button>
    <style>
      x-hello,
      :host {
        background-color: rgb(247, 234, 229);
        border: 1px solid rgb(241, 210, 200);
        padding: 5px;
        display: inline-block;
      }

      button {
        padding: 5px;
        border: 1px solid var(--button-border-color, gray);
        background-color: var(--button-background-color, lightgray);
        display: inline-block;
      }
    </style>
  `
}

XHello.createdCallback = function() {
  this.name = this.innerHTML
  this.render()
}

XHello.setName = function(name) {
  this.name = name
  this.render()
}

var XFoo = document.registerElement('x-hello', {prototype: XHello})
