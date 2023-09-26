import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import {addToCart, removeFromCart} from '../slices/cartSlice'


const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const totalItems = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.qty , 0);
    const totalPrice = cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.qty*cartItem.price, 0);
    // const [qty, setQty] = useState(1);
    const itemQtyChangeHandler = (item, qty) => {
        // setQty(Number(newQty));
        dispatch(addToCart({...item, qty}));
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkOutHandler = ()=>{
        navigate('/login?redirect=/shipping');
    }

    return <Row style={{
                        maxWidth: '100%',
                        margin:'0px',
                        boxSizing: 'border-box',
                        paddingLeft: '70px',
                        paddingRight: '70px',
                    }}>
        <h1 style={{ marginBottom: '20px', marginLeft:'10%', fontWeight:'800', fontSize:'30px', textTransform:'uppercase' }}>My Cart</h1>
        <Col md={7}>
            
            {cartItems.length === 0 ?(
                <Message>Your Cart is Empty<Link to = '/'>Go Back</Link></Message>
            ) : (
                <ListGroup variant= 'flush'>
                    {cartItems.map((cartItem) =>(
                        <ListGroupItem key = {cartItem._id} style={{backgroundColor: 'transparent'}}>
                            <Row>
                            <Col md={6} style={{display:'flex', justifyContent:'center'}}><Image src={cartItem.image} alt={cartItem.name} fluid /></Col>
                            
                            <Col md={6}>
                                <Row><Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link></Row>
                                <Row style={{marginLeft:'1px'}}>${cartItem.price}</Row>
                                <Row>
                                    <Col >
                                        <Form.Control
                                                as='select'
                                                value={cartItem.qty}
                                                onChange={(e) => itemQtyChangeHandler(cartItem, Number(e.target.value))}>
                                            {[...Array(cartItem.countInStock).keys()].map((x) => (
                                                <option key = {x+1} value = {x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col >
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(cartItem._id)}><FaTrash/></Button>
                                    </Col>                     
                                </Row>
                            </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md = {5}>
            <Card 
                style={{
                        borderRadius: '0px', 
                        maxWidth: '90%',
                        width: 'fit-content', 
                        height:'230px', 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        boxSizing: 'border-box',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                    }}
            >
                <ListGroup.Item>
                    <span><h4 style={{display:'inline'}}>{`Subtotal (${totalItems}) : `}</h4><strong><h3 style={{display:'inline'}}>{`$(${totalPrice})`}</h3></strong></span>
                </ListGroup.Item>
                <ListGroupItem>
                    <Button type='button' className='blue-button' disabled={cartItems.length === 0} onClick={checkOutHandler} style={{fontSize:'14px', margin:'10px'}}>
                        Proceed to Checkout
                    </Button>
                </ListGroupItem>
                <ListGroupItem>
                    <p style={{fontSize:'13px'}}>
                    Shipping, taxes, and discounts calculated at checkout.
                    Orders will be processed in USD.
                    </p>
                </ListGroupItem>
            </Card>
        </Col>
    </Row>
}


export default CartScreen;