import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";

import SafeLoadingContainer from "./SafeLoadingContainer";
import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <SafeLoadingContainer>
          <MyContainer />
        </SafeLoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
