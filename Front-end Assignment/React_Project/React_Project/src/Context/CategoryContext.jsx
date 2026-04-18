import { useState } from "react";
import { createContext } from "react";

export const CategoryContext = createContext('')

export const CategoryProvider = ({children})=>{
    const [catname,setCatName]=useState('')
    return(
       <CategoryContext.Provider value={{catname,setCatName}}>
            {children}
       </CategoryContext.Provider>
    )
}