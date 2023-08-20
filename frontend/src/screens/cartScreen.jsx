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

    return <Row style={{maxWidth: '100%', margin:0}}>
        <Col md={8}>
            <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
            {cartItems.length === 0 ?(
                <Message>Your Cart is Empty<Link to = '/'>Go Back</Link></Message>
            ) : (
                <ListGroup variant= 'flush'>
                    {cartItems.map((cartItem) =>(
                        <ListGroupItem key = {cartItem._id}>
                            <Row>
                            <Col ><Image src={cartItem.image} alt={cartItem.name} fluid /></Col>
                            <Col md={3}><Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link></Col>
                            <Col >${cartItem.price}</Col>
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
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md = {4}>
            <Card>
                <ListGroup.Item>
                    <h2>{`Subtotal (${totalItems}) Items`}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h4>{`Total: $(${totalPrice})`}</h4>
                </ListGroup.Item>
                <ListGroupItem>
                    <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                        Proceed to Checkout
                    </Button>
                </ListGroupItem>
            </Card>
        </Col>
    </Row>
}


export default CartScreen;