import firebase from "firebase/app";


export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error("Log out failed", error);
  }
};
