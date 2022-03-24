import React from 'react';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const store=ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
