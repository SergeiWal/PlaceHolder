export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId || 0;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = _getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;

    if (type === "input") {
      this.toggle();
    }
    if (type === "backdrop") {
      this.close();
    }
    if (type === "item") {
      const id = event.target.dataset.value;
      this.select(id);
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id == this.selectedId);
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove("selected");
    });
    this.$el.querySelector(`[data-value="${id}"]`).classList.add("selected");
    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.remove("fa-chevron-down");
    this.$arrow.classList.add("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.remove("fa-chevron-up");
    this.$arrow.classList.add("fa-chevron-down");
  }

  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }
}

function _getTemplate(data = [], placeholder, selectedId) {
  let text = placeholder || "Choose item";

  const items = data.map((item) => {
    let cls = "";
    if (selectedId == item.id) {
      text = item.value;
      cls = "selected";
    }
    return ` <li class="select__item ${cls}" data-type="item"  data-value="${item.id}">${item.value}</li>`;
  });
  return `
     <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <i class="fas fa-chevron-down" data-type="arrow"></i>
          </div>
          <div class="select__dropdown">
            <ul class="select__list">
              ${items.join("")}
            </ul>
          </div>
  `;
}
