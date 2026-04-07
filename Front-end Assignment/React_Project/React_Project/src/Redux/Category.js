import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";




export const addCategory = createAsyncThunk('addCategory', async (data) => {
    try {
        const doc = collection(db, 'category');
        const res = await addDoc(doc, data);
        if (res) {
            const result = {
                msg: "Category Created",
            }
            return result;
        }
    } catch (error) {
        return error
    }
})

export const getCategory = createAsyncThunk('getCategory', async () => {
    try {
        const doc = collection(db, 'category');
        const snapShort = await getDocs(doc);
        let arrayCat = [];
        snapShort.forEach((doc) => {
            arrayCat.push({ ...doc.data(), id: doc.id })
        })
       
        return arrayCat;

    } catch (error) {
        console.log(error);
        return error
    }
})

export const deleteCategory = createAsyncThunk('deleteCategory', async (cid) => {
    try {
        console.log(cid);
        const docRef = doc(db, 'category', cid);
        const res = await deleteDoc(docRef);
        const result = {msg: "Category Deleted",}
        return result;
    } catch (error) {
        return error
        console.log(error);
    }
})

export const getCatById = createAsyncThunk('getCatById',async(cid)=>{
    try {
        const docRef = doc(db, 'category', cid);
        const res = await getDoc(docRef);
        return res.data();
        
    } catch (error) {
        return error
    }
})


export const updateCategory = createAsyncThunk('updateCategory',async(obj)=>{
    try {
         const docRef = doc(db, 'category', obj.cid);
         const res = await updateDoc(docRef,obj.data);
         
            const result = {
                msg: "Category updated",
            }
            return result;
        
    } catch (error) {
        return error
    }
})


const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        singleCat: null,
        isloading: false,
        catArray: [],
        catMsg: null,
        catError: null
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addCategory.pending, (state, action) => {
            state.isloading = true;
        })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isloading = false;
                state.catMsg = action.payload.msg;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getCategory.pending, (state, action) => {
                state.isloading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isloading = false;
                state.catArray = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deleteCategory.pending, (state, action) => {
                state.isloading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isloading = false;
                state.catMsg = action.payload.msg;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getCatById.pending, (state, action) => {
                state.isloading = true;
            })
            .addCase(getCatById.fulfilled, (state, action) => {
                state.isloading = false;
                state.singleCat = action.payload;
            })
            .addCase(getCatById.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(updateCategory.pending, (state, action) => {
                state.isloading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isloading = false;
                state.catMsg = action.payload.msg;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload
            })
            
    }
})

const CategoryRedcuer = CategorySlice.reducer;
export default CategoryRedcuer;