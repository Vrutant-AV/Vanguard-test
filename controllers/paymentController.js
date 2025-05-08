const { Client } = require('pg');
const { client } = require('../config/paypalConfig');

exports.createOrder =async (req, res) => {
    try{
        const request = new PayPal.orders.OrdersCreateRequest();

        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    current_code: 'INR',
                    value: req.body.amount,
                },
            }],
        });

        const order = await client().execute(request);
        res.json({ id: order.result.id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.captureOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const request = new paypal.orders. OrdersCaptureRequest(orderId);
        request.resquestBody({});

        const capture = await Client().executr(request);
        req.json({ status: capture.result.status, capture });
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).json({ message: 'Error capturing order', error: error.message });
    }
};