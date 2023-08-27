import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const OrderScreen = ()=> {
    const { id: orderId } = useParams();

    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const {data: paypal, isLoading: loadingPayPal, error:errorPayPal } = useGetPayPalClientIdQuery();
    const {userInfo} = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async()=>{
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }

            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            }
        }
    },[errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            await payOrder({ orderId, details });
            refetch();
            toast.success('Order is paid');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        });
      }
    async function onApproveTest(){
        await payOrder({orderId, details : { payer: {}}});
                refetch();
                toast.success('Payment Successful');
    }
    function onError(err){
        toast.error(err.message)
    }
    function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: order.totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }


    return(
        isLoading ? <Loader /> : error ? <Message variant='danger'/>:
        (<>
            <h1>Order {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ):(
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item> 
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ):(
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup.Item variant='flush'>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup>
                            <Row>
                                <Col><strong>Items</strong></Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup>
                        <ListGroup>
                            <Row>
                                <Col><strong>Shipping</strong></Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup>
                        <ListGroup>
                            <Row>
                                <Col><strong>Tax</strong></Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup>
                        <ListGroup>
                            <Row>
                                <Col><strong>Total</strong></Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup>  
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {isPending ? <Loader/> : (
                                    <div>
                                        {/* <Button onClick={ onApproveTest } style={{marginBottom:10}}>Test Pay Order</Button> */}
                                    <div>
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        />
                                    </div>
                                    </div>
                                )}
                            </ListGroup.Item>
                        )}
                        {/* MARK AS DELIVERED PLACEHOLDER */}      
                    </Card>
                </Col>
            </Row>
        </>)
    )
}

export default OrderScreen;