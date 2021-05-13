import React, {createContext, useReducer} from "react";
import hookReviewReducer from "./hookReviewReducer";

export const ReviewContext = createContext();

const initialState = {
    reviews: []
};

const ReviewStore = ({children}) => {
    const [reviewState, reviewDispatch] = useReducer(hookReviewReducer, initialState);
    return (
        <ReviewContext.Provider value={[reviewState, reviewDispatch]}>
            {children}
        </ReviewContext.Provider>
    )
};

export default ReviewStore;