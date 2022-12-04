export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }

  render(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(el) {
    this._element.prepend(el);
  }
}
