import { configure, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from './App';
import { MemoryRouter } from "react-router-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("Un H1 deberia renderizarse en todas las rutas", () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('h1').at(0).text()).toEqual('Henry Food');
    }),
    it('Debería renderizarse en la ruta "/home"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('h1')).toHaveLength(1);
    }),
    it('Deberia renderizarse en la ruta /recipe/:recipeId', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipe/:recipeId"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('h1')).toHaveLength(1);
    }),
    it('Deberia renderizarse en la ruta /recipe', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipe"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('h1').at(0).text()).toEqual('Henry Food');
    })
  });
});
