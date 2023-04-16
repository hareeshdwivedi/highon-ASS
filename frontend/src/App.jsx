import RouterComponent from "./components/RouterComponent";
import { AppProvider } from "./store/Context";

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <RouterComponent />
      </div>
    </AppProvider>
  );
};

export default App;
