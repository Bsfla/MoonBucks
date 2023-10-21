//메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
//추가되는 메뉴의 마크업은 <ul id="expresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//홈 메뉴 갯수를 카운트하여 상단에 보여준다
//메뉴가 추가되고 나면 input은 빈 값으로 초기화 한다
// 사용자 입력값이 빈값이라면 추가되지 않는다.
// 수정
// 삭제

import { $ } from "../utils/dom";
import { store } from "../store/store";

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    teavana: [],
    tibana: [],
    desert: [],
  };
  this.category = "espresso";
  this.init = () => {
    const menu = store.getStorage();

    if (menu) {
      this.menu = menu;
    }
    render();
  };

  const render = () => {
    const menuTemplate = this.menu[this.category]
      .map((menuItem, index) => {
        return `<li data-menuId="${index}" class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">${
          menuItem.name
        }</span>
    <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-soldout-button"
  >
    품절
  </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
   </li>`;
      })
      .join("");

    $("#menu-list").innerHTML = menuTemplate;
    updateTotalMenuCount();
  };
  const addCoffeeMenu = () => {
    const menuName = $("#menu-name").value;
    if (!menuName) return alert("값을 입력해주세요.");

    this.menu[this.category].push({ name: menuName, soldOut: false });
    store.setStorage(this.menu);

    render();
  };

  const updateCoffeMenu = (menu) => {
    const menuId = menu.dataset.menuid;
    const menuName = menu.querySelector(".menu-name");
    const updatedInputValue = prompt(
      "수정할 값을 입력해주세요.",
      menuName.textContent
    );
    this.menu[this.category][menuId].name = updatedInputValue;
    store.setStorage(this.menu);
    render();
  };

  const deleteCoffeMenu = (menu) => {
    const isRemoveConfirm = confirm("메뉴를 삭제하시겠습니다");
    const menuList = $("#menu-list");
    const menuId = menu.dataset.menuid;

    if (isRemoveConfirm) {
      this.menu[this.category].splice(menuId, 1);
      store.setStorage(this.menu);
      render();
      updateTotalMenuCount(menuList);
    }
  };

  const soldOutCoffeMenu = (menu) => {
    const menuId = menu.dataset.menuid;

    this.menu[this.category][menuId].soldOut =
      !this.menu[this.category][menuId].soldOut;

    store.setStorage(this.menu);

    render();
  };

  const changeMenuCategory = (category) => {
    const categoryName = category.dataset.categoryName;

    this.category = categoryName;

    $("#category-title").innerText = `${category.innerText} 메뉴관리`;

    render();
  };

  const updateTotalMenuCount = () => {
    const totalMenuListCount = $(".menu-count");
    totalMenuListCount.innerText = `총 ${this.menu[this.category].length}개`;
  };

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCoffeeMenu();
    }
  });

  $(".input-submit").addEventListener("click", addCoffeeMenu);

  $("#menu-list").addEventListener("click", (e) => {
    const menu = e.target.closest("li");
    if (e.target.classList.contains("menu-edit-button")) {
      updateCoffeMenu(menu);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      deleteCoffeMenu(menu);
    }

    if (e.target.classList.contains("menu-soldout-button")) {
      soldOutCoffeMenu(menu);
    }
  });

  $("nav").addEventListener("click", (e) => {
    const category = e.target.closest("button");

    changeMenuCategory(category);
  });
}

const app = new App();

app.init();
