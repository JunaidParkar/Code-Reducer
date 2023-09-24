class Dkit {
  constructor() {
    this.element = null;
  }

  static init() {
    return new Dkit();
  }

  id(id) {
    this.element = document.getElementById(id);
    return this;
  }

  class(className) {
    if (this.element) {
      this.element = this.element.getElementsByClassName(className);
    } else {
      this.element = document.getElementsByClassName(className);
    }
    return this;
  }

  tag(tagName) {
    if (this.element) {
      this.element = this.element.getElementsByTagName(tagName);
    } else {
      this.element = document.getElementsByTagName(tagName);
    }
    return this;
  }

  query(selector) {
    if (this.element) {
      this.element = this.element.querySelector(selector);
    } else {
      this.element = document.querySelector(selector);
    }
    return this;
  }

  create(tag) {
    if (tag) {
      this.element = document.createElement(tag)
    }
    return this
  }

  get() {
    return this.element;
  }

  revert() {
    this.element = null;
    return this;
  }
}

module.exports = Dkit;
