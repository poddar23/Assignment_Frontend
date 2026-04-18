import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { db } from "../Firebase/firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";


export const userRegistration = createAsyncThunk('userRegistration' , async(data)=>{
    try{
        const doc= collection(db,'user')
        const res = await addDoc(doc,data);
      const result={
        userMsg:"user added",
      }
      return result;
    }catch(error){
        return error;
    }
})

export const logout = createAsyncThunk('logout',async()=>{
         try {
            return true;
         } catch (error) {
            
         }
})

export const userLogin = createAsyncThunk('userLogin',async(loginUser)=>{
    try {
        const docref = collection(db,'user');
        const q= query(docref,where('email','==',loginUser.email),where('password','==',loginUser.password));

        const querySnapshot = await getDocs(q);
        let user ={};
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           user ={
                ...doc.data(),
              id:doc.id,
              
           }
          
        });
        let response = { msg:"Successfully login",userInfo:user};
        return response
        

    } catch (error) {
        console.log(error);
        
    }
})

export const  UserSlice=createSlice({
    name:'users',
    initialState:{
        singleUser:{},
        userError:null,
        isLoading:false,
        userMsg:'',
        islogged:false
        
    } 
    ,
    reducers:{},
    extraReducers:(builder)=>{
builder.addCase(userRegistration.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(userRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userMsg = action.payload.msg;
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.userError = action.payload
            })
            .addCase(userLogin.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userMsg = action.payload.msg;
                state.singleUser = action.payload.userInfo
                state.islogged=true
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.userError = action.payload
            })
            .addCase(logout.fulfilled,(state,action)=>{
                  state.islogged=false,
                  state.singleUser=false
            })
    }
})
const UserReducer=UserSlice.reducer
export default UserReducer