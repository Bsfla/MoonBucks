//메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
//추가되는 메뉴의 마크업은 <ul id="expresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//홈 메뉴 갯수를 카운트하여 상단에 보여준다
//메뉴가 추가되고 나면 input은 빈 값으로 초기화 한다
// 사용자 입력값이 빈값이라면 추가되지 않는다.
// 수정
// 삭제

const $ = (selector) => document.querySelector(selector);

const addCoffeeMenu = () => {
  const input = $("#espresso-menu-name");
  if (!input.value) return alert("값을 입력해주세요.");
  const menuTemplate = `<li class="menu-list-item d-flex items-center py-2">
 <span class="w-100 pl-2 menu-name">${input.value}</span>
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
$("#espresso-menu-list").insertAdjacentHTML("beforeend", menuTemplate);
  updateTotalMenuCount();
}

const updateCoffeMenu = (menu) => {
  const menuName = menu.querySelector(".menu-name");
  const updatedInputValue = prompt("수정할 값을 입력해주세요.", menuName.textContent);

  menuName.innerText = updatedInputValue;
}

const deleteCoffeMenu = (menu) => {
  const isRemoveConfirm = confirm("메뉴를 삭제하시겠습니다");
  const menuList = $("#espresso-menu-list");

      if (isRemoveConfirm)  {
        menu.remove();
        updateTotalMenuCount(menuList);
      }
}

const updateTotalMenuCount = () => {
  const totalMenuListCount = $(".menu-count");
  const input = $("#espresso-menu-name");
  const menuListCount = $("#espresso-menu-list").querySelectorAll("li").length;
  totalMenuListCount.innerText = `총 ${menuListCount}개`;
  input.value = "";
}



function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCoffeeMenu();
    }
  });

  $(".input-submit").addEventListener("click", addCoffeeMenu)


  $("#espresso-menu-list").addEventListener("click", (e) => {
    const menu =  e.target.closest("li");
    if (e.target.classList.contains("menu-edit-button")) {
      updateCoffeMenu(menu);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      deleteCoffeMenu(menu);  
    }
  })
  


}

App();
