import { Fragment } from "react";
import "./App.css"
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <main className="main">
        <Outlet />
      </main>
    </Fragment>
  )
}

export default App;