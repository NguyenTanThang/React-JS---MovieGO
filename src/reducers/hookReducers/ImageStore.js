import React, {createContext, useReducer} from "react";
import hookImageReducer from "./hookImageReducer";

export const ImageContext = createContext();

const initialState = {
    images: []
};

const ImageStore = ({children}) => {
    const [imageState, imageDispatch] = useReducer(hookImageReducer, initialState);
    return (
        <ImageContext.Provider value={[imageState, imageDispatch]}>
            {children}
        </ImageContext.Provider>
    )
};

export default ImageStore;