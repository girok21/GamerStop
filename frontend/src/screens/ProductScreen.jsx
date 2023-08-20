import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch } from 'react-redux';
import '../assets/ProductScreen.style.scss';
import Loader from '../components/Loader';
import {useGetProductDetailsQuery} from '../slices/productsApiSlice'
import Message from '../components/Message';
import {addToCart} from '../slices/cartSlice'

const ProductScreen = () => {
    const {id:productId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    
    const addToCartHandler = () =>{
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }
    return (
    <>
        {/* <Button onClick={<Link to='/'></Link>}>GO BACK</Button> */}
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        { isLoading ? (
            < Loader />
        ) : error ? (
            <Message variant='danger'>
                { error?.data?.message || error.error}
            </Message>) : (
                    <Row style={{maxWidth: '100%'}}>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={` ${product.numReviews} reviews`}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span>Price: ${product.price}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <span>{product.description}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col><strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key = {x+1} value = {x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button
                                        className='btn-blcok'
                                        type = 'submit'
                                        disabled = {product.countInStock === 0}
                                        onClick = {addToCartHandler}
                                    >
                                        Add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                            
                        </Card>
                    </Col>
                </Row>
        
        )}
    </>
  )
}

export default ProductScreen;