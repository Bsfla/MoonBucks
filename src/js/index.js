//메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
//추가되는 메뉴의 마크업은 <ul id="expresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//홈 메뉴 갯수를 카운트하여 상단에 보여준다
//메뉴가 추가되고 나면 input은 빈 값으로 초기화 한다
// 사용자 입력값이 빈값이라면 추가되지 않는다.
// 수정
// 삭제

// 1. 웹서버를 띄운다
// 2. 서버에 새로운 메뉴가 추가될 수 있도록 요청한다.
// 3. 서버에 카테고리별 메뉴리스트를 불러온다.
// 4. 서버에 카테고리 별 메뉴리스트를 불러온다.
// 5. 서버에 메뉴가 수정 될 수 있도록 요청한다
// 6. 서버에 메뉴의 품절상태가 토글될 수 있도록 요청한다.
// 7. 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// localStorage에 저장하는 로직은 지운다.
// fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert로 예외 처리를 진행한다

// 중복되는 메뉴는 추가할 수 없다 .
import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import MenuApi from "./api/index.js";

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.category = "espresso";
  this.init = async () => {
    render();
  };

  const render = async () => {
    this.menu[this.category] = await MenuApi.getAllCoffeeMenu(this.category);
    console.log(this.menu[this.category]);
    const menuTemplate = this.menu[this.category]
      .map((menuItem) => {
        return `<li data-menuId="${
          menuItem.id
        }" class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${
      menuItem.isSoldOut ? "sold-out" : ""
    }">${menuItem.name}</span>
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
  const addCoffeeMenu = async () => {
    const menuName = $("#menu-name").value;
    if (!menuName) return alert("값을 입력해주세요.");

    await MenuApi.postCoffeMenu(this.category, menuName);
    $("#menu-name").value = "";
    render();
  };

  const updateCoffeMenu = async (menu) => {
    const menuId = menu.dataset.menuid;
    const menuName = menu.querySelector(".menu-name");
    const updatedInputValue = prompt(
      "수정할 값을 입력해주세요.",
      menuName.textContent
    );
    await MenuApi.updateCoffeMenu(this.category, menuId, updatedInputValue);
    render();
  };

  const deleteCoffeMenu = async (menu) => {
    const isRemoveConfirm = confirm("메뉴를 삭제하시겠습니다");
    const menuList = $("#menu-list");
    const menuId = menu.dataset.menuid;

    if (isRemoveConfirm) {
      await MenuApi.deleteCoffeMenu(this.category, menuId);
      render();
      updateTotalMenuCount(menuList);
    }
  };

  const soldOutCoffeMenu = async (menu) => {
    const menuId = menu.dataset.menuid;

    await MenuApi.toggleSoldOutCoffeMenu(this.category, menuId);

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
      return updateCoffeMenu(menu);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      return deleteCoffeMenu(menu);
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
