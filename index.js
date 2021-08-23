import { Select } from "./select/select.js";
import "./select/style.scss";

const select = new Select("#select", {
  placeholder: "Выбери элемент",
  selectedId: "4",
  data: [
    { id: 1, value: "React" },
    { id: 2, value: "Angular" },
    { id: 3, value: "Vue" },
    { id: 4, value: "Next" },
    { id: 5, value: "AJAX" },
    { id: 6, value: "Express" },
    { id: 7, value: "JQuery" },
  ],
  onSelect(item) {
    console.log(item);
  },
});

window.s = select;
