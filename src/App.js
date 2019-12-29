import React, {
  useState,
  useEffect,
} from "react";
// COMPONENTs
import MainLayout from "@/containers/MainLayout";
import Loading from "@/components/common/Loading";
// STYLE
import "./App.css";
import "tabler-react/dist/Tabler.css";
// FIREBASE
import "./firebase";
import * as firebase from "firebase/app";


window.firebasae = firebase;


function App() {

  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(_user) {
      setUser(_user);
      setIsLoading(false);
    });
  }, []);


  if (isLoading || !user) {
    return (
      <Loading />
    );
  }


  return (
    <MainLayout
      user={user}
    />
  );
}


export default App;
