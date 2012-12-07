
// Shuffles the child elements of any HTML element that has
// children and returns the element.
//
// Usage:
// someElement.shuffleChildren();

HTMLElement.prototype.shuffleChildren = function() {
  for (var i = this.children.length - 1; i >= 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    this.appendChild(this.children[r]);
  }
  return this;
};