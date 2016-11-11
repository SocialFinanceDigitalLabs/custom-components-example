var XSelect = Object.create(HTMLElement.prototype)

XSelect.render = function() {
  var root = this.createShadowRoot()
  var name = this.name
  root.innerHTML = `
    <div class="caption">
      <span>Select Something Really Special</span> <button>&#9660;</button>
    </div>
    <div class="dropdown">
      ${name}
    </div>

    <style>
      :host {
        display: inline-block;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      x-select {
        display: inline-block;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .caption {
        background-color: white;
        border: 1px solid gray;
        overflow: hidden;
        cursor: default;
      }

      .caption span {
        padding: 3px 3px 0 3px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .caption button:focus + :host {
        outline: auto 5px -webkit-focus-ring-color;
      }

      .caption button {
        float: right;
        margin-left: 5px;
        font-size: 10px;
        padding: 5px 6px 5px 6px;
        border: 0;
        outline: none;
      }

      .dropdown {
        background-color: white;
        border: 1px solid gray;
        position: fixed;
      }

      .dropdown x-option:hover {
        background-color: black;
        color: white;
      }
      .dropdown x-option {
        padding: 5px;
        display: block;
      }

      button {
        padding: 5px;
        border: 1px solid var(--button-border-color, gray);
        background-color: var(--button-background-color, lightgray);
        display: inline-block;
      }
    </style>
  `

  const dropdownButton = root.querySelector('.caption > button')
  const dropdown = root.querySelector('.dropdown')
  const caption = root.querySelector('.caption')
  dropdownButton.onmousedown = caption.onmousedown = function() {
    dropdown.style.minWidth = caption.getBoundingClientRect().width - 2 + 'px'
    dropdown.removeAttribute('hidden')
  }
  dropdown.setAttribute('hidden', 'hidden')
  this.setAttribute('tabindex', 0)
  this.root = root

  this.onfocus = function() {
    this.style.outline = 'auto 5px -webkit-focus-ring-color'
  }
  this.onblur = function() {
    this.style.outline = ''
  }
}

XSelect.attributeChangedCallback = function() {
  this.name = this.innerHTML
  this.render()  
}

XSelect.hideDropdown = function(event) {
  if (event.target !== this) {
    const dropdown = this.root.querySelector('.dropdown')
    dropdown.setAttribute('hidden', 'hidden')
  }
}

XSelect.attachedCallback = function() {
  document.addEventListener('mousedown', this.hideDropdown.bind(this))
}

XSelect.detachedCallback = function() {
  document.removeEventListener('mousedown', this.hideDropdown.bind(this))
}

XSelect.createdCallback = function() {
  this.name = this.innerHTML
  this.render()
}

XSelect.setName = function(name) {
  this.name = name
  this.render()
}

document.registerElement('x-select', {prototype: XSelect})
