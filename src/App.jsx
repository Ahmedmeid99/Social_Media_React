import React, { Suspense, useEffect } from "react";
import Loading from "./Components/Loading";
import AppRouter from "./routes/AppRouter";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./Global/Methods";
import { setUserInfo } from "./Redux/user/userSlice";


function App() {
  const dispatch = useDispatch();

   useEffect(() => {
    const userInfo = getUserInfo(); // Retrieve user info from storage
    if (userInfo) {
      dispatch(setUserInfo(userInfo)); // Dispatch action to update the user slice
      console.log('User info found:', userInfo); // Log the user info
    } else {
      console.log('No user info found'); // Handle case where there's no user info
    }
  }, [dispatch]);
  return (
    <>
      <Suspense fallback={<Loading />}>
          <AppRouter />
      </Suspense>
    </>
  );
}

export default App;
