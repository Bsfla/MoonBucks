import Component from "../../../V2/src/core/Component";

class App extends Component {
  mounted() {
    const $app = this.$target;
    new MainPage($app);
  }
}
