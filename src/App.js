import './App.css';
import ProductPage from "./productPage/ProductPage";
import store from "./redux/store";
import {Provider} from "react-redux";

function App() {
  return (
    <div className="App">
        <ProductPage/>
    </div>
  );
}

const AppContainer = () => (
    <Provider store={store}>
            <App />
    </Provider>
);

export default AppContainer;
