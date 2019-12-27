import {
  createContext,
} from "react";


const AddPostContext = createContext({
  formValue: {},
  setFormValues: () => {},
});


export default AddPostContext;