import React, { useEffect } from "react";
import Header from "./Header";

function Layout(props) {
  
  return (
    <div className=" bg-gray-50 dark:bg-darkColor-800">
      <Header />
      {props.children}
      {/* <Footer/> */}
    </div>
  );
}

export default Layout;
