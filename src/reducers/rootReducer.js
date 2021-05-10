import genreReducer from "./genreReducer";
import imageReducer from "./imageReducer";
import loadingReducer from "./loadingReducer";
import movieReducer from "./movieReducer";
import reviewReducer from "./reviewReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    genreReducer,
    loadingReducer,
    imageReducer,
    movieReducer,
    reviewReducer
})

export default rootReducer;