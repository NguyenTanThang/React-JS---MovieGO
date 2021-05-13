import React, {createContext, useReducer} from "react";
import hookGenreReducer from "./hookGenreReducer";

export const GenreContext = createContext();

const initialState = {
    genres: []
};

const GenreStore = ({children}) => {
    const [genreState, genreDispatch] = useReducer(hookGenreReducer, initialState);
    return (
        <GenreContext.Provider value={[genreState, genreDispatch]}>
            {children}
        </GenreContext.Provider>
    )
};

export default GenreStore;