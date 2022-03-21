import React from 'react';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const store=configureStore();

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
