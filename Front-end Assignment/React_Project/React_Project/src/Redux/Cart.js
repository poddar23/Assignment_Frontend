import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc,query,where } from "firebase/firestore";
import { db } from "../Firebase/firebase";


export const viewCartData = createAsyncThunk('viewCartData', async (uid) => {
    try {
        //get product
        const doc1 = collection(db, 'product');
        const snapShort1 = await getDocs(doc1);
        let arrayProduct = [];
        snapShort1.forEach((doc) => {
            arrayProduct.push({ ...doc.data(), id: doc.id })
           
            
        })
         console.log(arrayProduct);
              const cartRef = collection(db, 'cart');

          const q = query(
        cartRef,
        where("userid", "==", uid)
      );

        const snapShort = await getDocs(q);
        
        let arrayCart = [];
       if(snapShort){
           snapShort.forEach((doc) => {
           const res = arrayProduct.find((index,i)=>{
                if(index.id==doc.data().productid){
                    return index
                }
           })
        arrayCart.push({ ...doc.data(), id: doc.id,  product: res ?? []})
        })
       }
       console.log('in thunck',arrayCart);
       
        return arrayCart;

    } catch (error) {
        console.log(error);
        return error
    }
})



export const addTOCart = createAsyncThunk('addTOCart', async (data) => {
    try {
        const doc = collection(db, 'cart');
        const res = await addDoc(doc, data);
        if (res) {
            const result = {
                msg: "Item added in cart",
            }
            return result;
        }
    } catch (error) {
        return error
    }
})

export const deleteCartData = createAsyncThunk('deleteCartData', async (cartid) => {
    try {
        
        const docRef = doc(db, 'cart', cartid);
        const res = await deleteDoc(docRef);
        const result = {msg: "Cart Items Deleted",}
        return result;
   
    } catch (error) {
        return error
        console.log(error);
    }
})

export const updatecartData = createAsyncThunk('updatecartData',async(obj)=>{
    try {
         const docRef = doc(db, 'cart', obj.cartid);
         const res = await updateDoc(docRef,obj.data);
         
            const result = {
                msg: "Cart updated",
            }
            return result;
        
    } catch (error) {
        return error
    }
})

// export const getCategory = createAsyncThunk('getCategory', async () => {
//     try {
//         const doc = collection(db, 'category');
//         const snapShort = await getDocs(doc);
//         let arrayCat = [];
//         snapShort.forEach((doc) => {
//             arrayCat.push({ ...doc.data(), id: doc.id })
//         })
       
//         return arrayCat;

//     } catch (error) {
//         console.log(error);
//         return error
//     }
// })

// export const deleteCategory = createAsyncThunk('deleteCategory', async (cid) => {
//     try {
//         console.log(cid);
//         const docRef = doc(db, 'category', cid);
//         const res = await deleteDoc(docRef);
//         const result = {msg: "Category Deleted",}
//         return result;
//     } catch (error) {
//         return error
//         console.log(error);
//     }
// })

// export const getCatById = createAsyncThunk('getCatById',async(cid)=>{
//     try {
//         const docRef = doc(db, 'category', cid);
//         const res = await getDoc(docRef);
//         return res.data();
        
//     } catch (error) {
//         return error
//     }
// })


// export const updateCategory = createAsyncThunk('updateCategory',async(obj)=>{
//     try {
//          const docRef = doc(db, 'category', obj.cid);
//          const res = await updateDoc(docRef,obj.data);
         
//             const result = {
//                 msg: "Category updated",
//             }
//             return result;
        
//     } catch (error) {
//         return error
//     }
// })


const CartSlice = createSlice({
    name: 'category',
    initialState: {
          cartMsg:null,
          cartError:null,
          singleCartItem:{},
          cartData:[],
          cartloading:false
          
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(addTOCart.pending, (state, action) => {
            state.cartloading = true;
        })
            .addCase(addTOCart.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cartMsg = action.payload.msg;
            })
            .addCase(addTOCart.rejected, (state, action) => {
                state.cartError = action.payload
            })
            .addCase(viewCartData.pending, (state, action) => {
            state.cartloading = true;
        })
            .addCase(viewCartData.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cartData= action.payload;
            })
            .addCase(viewCartData.rejected, (state, action) => {
                state.cartError = action.payload
            })
              .addCase(deleteCartData.pending, (state, action) => {
            state.cartloading = true;
        })
            .addCase(deleteCartData.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cartMsg= action.payload.msg;
            })
            .addCase(deleteCartData.rejected, (state, action) => {
                state.cartError = action.payload
            })
              .addCase(updatecartData.pending, (state, action) => {
            state.cartloading = true;
        })
            .addCase(updatecartData.fulfilled, (state, action) => {
                state.cartloading = false;
                state.cartMsg= action.payload.msg;
            })
            .addCase(updatecartData.rejected, (state, action) => {
                state.cartError = action.payload
            })
            
            
    }
})

const CartRedcuer = CartSlice.reducer;
export default CartRedcuer;