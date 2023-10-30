const store = {
  setStorage: (item) => localStorage.setItem("menu", JSON.stringify(item)),
  getStorage: () => JSON.parse(localStorage.getItem("menu")),
};

export default store;
