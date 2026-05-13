const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    return res.json('hello')
})


const razorpay = new Razorpay({
    key_id: 'rzp_test_SonPLabLeQMiyv',
    key_secret: '7whoqrUYvfkHAlXlrbFDHUoi',
});


app.post('/create-order', async (req, res) => {
    console.log('order');
    
    const options = {
        amount: 1 * 100, // 500 rs
        currency: "INR",
        receipt: "receipt_order_1",
    };

    try {

        const order = await razorpay.orders.create(options);
        console.log(order);
        
        res.json(order);

    } catch (err) {
        console.log(err);
        
        res.status(500).send(err);
    }
});

app.listen(5000, () => {
    console.log("Server running");
});