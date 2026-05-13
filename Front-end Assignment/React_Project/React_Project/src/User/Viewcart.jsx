import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartData, updatecartData, viewCartData } from '../Redux/Cart';
import axios from 'axios';
import { addDoc,doc, collection,query,getDocs,deleteDoc,where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';



function Viewcart() {
  const [userAuth,setUserAuth]=useState({})
    const dispatch = useDispatch()
    const {cartError,cartData,cartMsg} = useSelector((state)=>state.cart)
    const [total,setTotal] = useState(0);
    const [q,setQ] = useState(0)
//=================================Pay============================
  const handlePayment = async () => {

    // Create order from backend
    const res = await axios.post("http://localhost:5000/create-order");

    const order = res.data;

    order['userid']=userAuth.id

    const docRef = collection(db,'order')
    const add = await addDoc(docRef,order)

    console.log(order);
    

    const options = {
      key: "rzp_test_SonPLabLeQMiyv",
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Test Transaction",
      order_id: order.id,

      handler: async function (response) {

        console.log("Payment Success");

        console.log(response);
        response['userid']=userAuth.id
          const docRef1 = collection(db,'payments')
         const add1 = await addDoc(docRef1,response)

          const cartRef = collection(db, "cart");

        // query
        const q = query(cartRef, where("userid", "==", userAuth.id));

        // get matched docs
        const querySnapshot = await getDocs(q);

        // delete all docs
        querySnapshot.forEach(async (item) => {
          console.log(item.id);
          

            await deleteDoc(doc(db, "cart", item.id));

        });

        console.log("Cart Removed");

        alert("Payment Successful");
      },

      prefill: {
        name: "Ronak",
        email: "ronak@gmail.com",
        contact: "8402833375",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };
//========================================================
    const updateQty= (cartid,qty)=>{
        console.log(cartid);
        console.log(qty);

        if(qty == 0){
             dispatch(deleteCartData(cartid))
        }
        if(qty >= 1){
            let data = {qty:qty}
            dispatch(updatecartData({cartid:cartid,data}))
        }
        setQ(q+1)
        
    }

    useEffect(()=>{
          let userInfo = localStorage.getItem('loggedUser');
        
        if(userInfo){
            userInfo = JSON.parse(userInfo)
            console.log(userInfo);
            setUserAuth(userInfo)
            dispatch(viewCartData(userInfo.id))
        }    
      
    },[dispatch,cartMsg,q])

    useEffect(()=>{
          if(cartData){
            let total1 = cartData.reduce((sum,index,i)=>{
                  sum += (index.product.price * index.qty);
                 
                  return sum
            },0);

           setTotal(total1)
           
        }
    },[cartData,cartMsg])
  return (
    <div className="overflow-x-auto p-6">
        {
            cartMsg&& <p>{cartMsg}</p>
        }
         <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
    
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 text-left">Product</th>
        <th className="p-3 text-left">Price</th>
        <th className="p-3 text-left">Quantity</th>
        <th className="p-3 text-left">Total</th>
        <th className="p-3 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      
      

      {

          cartData && cartData.map((index,i)=>(
            <tr className="border-t">
        <td className="p-3 flex items-center gap-3">
          <img 
            src={index.product.pimage} 
            className="w-14 h-14 rounded"
          />
          <div>
            <h2 className="font-semibold">{index.product.pname}</h2>
            <p className="text-sm text-gray-500">Size: L</p>
          </div>
        </td>

        <td className="p-3 font-medium">{index.product.price}</td>

        <td className="p-3">
          <input 
            type="number" 
            value={index.qty}
            className="w-16 border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>{
                updateQty(index.id,e.target.value)
            }}
          />
        </td>

        <td className="p-3 font-semibold">{index.product.price * index.qty}</td>

        <td className="p-3 text-center">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={()=>{
              dispatch(deleteCartData(index.id))
          }}>
            Remove
          </button>
        </td>
      </tr>
          ))
      }

    </tbody>
  </table>

  <div className="flex justify-end mt-6">
    <div className="bg-gray-100 p-5 rounded-lg w-72">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

      

      <div className="flex justify-between font-bold text-lg border-t pt-3">
        <span>Total</span>
        <span>{total}</span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mt-4" onClick={handlePayment}>
        Checkout
      </button>
    </div>
  </div>


    </div>
  )
}

export default Viewcart