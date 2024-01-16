import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "@/store/modalsSlice";
import setParameterReducer from "@/store/parameterSlice";
import setHomeParameterReducer from "@/store/homeParameterSlice";
import bucketDetailReducer from "@/store/bucketDetailSlice";
import bucketThumnailReducer from "@/store/bucketThumnailSlice";
import navBarReducer from "@/store/navBarMenuSlice";

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    parameter: setParameterReducer,
    homeParameter: setHomeParameterReducer,
    bucketDetail: bucketDetailReducer,
    bucketThumnail: bucketThumnailReducer,
    navBarMenu: navBarReducer,
  },
});

export { store };
