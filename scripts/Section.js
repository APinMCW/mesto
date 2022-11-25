export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }

  render() {
    this.items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem() {
    this._element.prepend(el);
  }
}
