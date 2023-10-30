const BASE_URL = "http://localhost:3000";

const request = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    console.error("에러가 발생했습니다");
  }

  return response.json();
};

const requestWithOutJson = async (url, option) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    console.error("에러가 발생했습니다");
  }
};

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },

  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  DELETE() {
    return {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
};

const MenuApi = {
  getAllCoffeeMenu(category) {
    return request(`${BASE_URL}/api/category/${category}/menu`);
  },

  postCoffeMenu(category, menuName) {
    return request(
      `${BASE_URL}/api/category/${category}/menu`,
      HTTP_METHOD["POST"]({ name: menuName })
    );
  },

  updateCoffeMenu(category, menuId, menuName) {
    return request(
      `${BASE_URL}/api/category/${category}/menu/${menuId}`,
      HTTP_METHOD["PUT"]({ name: menuName })
    );
  },
  toggleSoldOutCoffeMenu(category, menuId) {
    return request(
      `${BASE_URL}/api/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD["PUT"]()
    );
  },

  deleteCoffeMenu(category, menuId) {
    return requestWithOutJson(
      `${BASE_URL}/api/category/${category}/menu/${menuId}`,
      HTTP_METHOD["DELETE"]()
    );
  },
};

export default MenuApi;
