import React, { Component } from "react"
import { AppContainer } from "react-hot-loader"
import { render } from 'react-dom';
import CA from './ca.js';

const renderApp = () => {
  render(<AppContainer>
          <CA/>
        </AppContainer>, document.getElementById("app"));
}

renderApp() // Renders App on init

if (module.hot) {
  module.hot.accept("./ca.js", renderApp)
}
