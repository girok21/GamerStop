import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import '../assets/ProductScreen.style.scss';

const ProductScreen = () => {
    const [product, setProducts] = useState([]);
    const {id:productId} = useParams();
    useEffect(() =>{
        const fetchedProducts = async() =>{
            const response = await axios.get(`/api/products/${productId}`);
            setProducts(response.data);
        }
        fetchedProducts();
    },[productId]);
  return (
    <>
        {/* <Button onClick={<Link to='/'></Link>}>GO BACK</Button> */}
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
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
                                <Col><stron>${product.price}</stron></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col><stron>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</stron></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                className='btn-blcok'
                                type = 'submit'
                                disabled = {product.countInStock === 0}
                            >
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen;