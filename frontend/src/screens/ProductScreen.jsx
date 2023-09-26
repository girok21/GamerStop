import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../assets/ProductScreen.style.scss';
import Loader from '../components/Loader';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice'
import Message from '../components/Message';
import {addToCart} from '../slices/cartSlice';
import Carousel  from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";


const ProductScreen = () => {
    const {id:productId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const [writeReview, setWriteReview] = useState(false);
    
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

    const [displayImage, setDisplayImage] = useState('');
    const [productColor, setProductColor] = useState('');
    
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);
    
    const addToCartHandler = () =>{
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }

    useEffect(()=>{
        if(!isLoading)
        {
            setDisplayImage(product.images[0]);
            if(product.colors)
                setProductColor(product.colors[0]);
        }
    }, [product, isLoading])

    const submitHandler = async(e) =>{
        e.preventDefault();     
        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();
            refetch();
            
            toast.success('Review Submitted');
            setRating(0);
            setComment('')

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    

    return (
    <>
        {/* <Button onClick={<Link to='/'></Link>}>GO BACK</Button> */}
        <Link className='btn btn-light my-3' to='/' style={{marginLeft: '30px'}}>
            Go Back
        </Link>

        { isLoading ? (
            < Loader />
        ) : error ? (
            <Message variant='danger'>
                { error?.data?.message || error.error}
            </Message>) : (
                <>
                <Row style={{maxWidth: '100%'}}>
                    <Col md={7} className='product-image'>
                        <div style={{width: '80%', display:'flex', flexDirection:'row-reverse', paddingBottom:'35px'}}>
                            <Image src={displayImage} alt={product.name}/>
                        </div>
                        <div style={{marginLeft: '20px'}}>
                            <Carousel
                                responsive={responsive}  
                                // infinite={true}
                            >
                                {product.images.filter((imageSource)=>{
                                    console.log(imageSource, productColor)
                                    return imageSource.includes(productColor);
                                }).map((imageSource)=>(
                                    <div  style={{background:'#e3e3e3',margin:'3px'}}>
                                        <Image src={imageSource} 
                                            style={{width:'100%', cursor: 'pointer'}} 
                                            onClick={(e)=>{e.preventDefault(); setDisplayImage(imageSource)}}/>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </Col>
                    <Col md={5} style={{paddingLeft: 40}}>
                        <Row className='product-details'>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span>{product.description}</span>
                                </ListGroup.Item>
                                {product.colors.length!==0 && <ListGroupItem>
                                <div>
                                    {product.colors.map((color)=>(
                                        <span style={{width:'25px', 
                                                    height:'25px', 
                                                    borderRadius:'50%', 
                                                    backgroundColor:color, 
                                                    margin:'5px',
                                                    borderWidth: '1px ',
                                                    borderStyle: 'dotted',
                                                    display: 'inline-block',
                                                    cursor: 'pointer', 
                                                }}
                                                onClick={(e)=>{ e.preventDefault(); 
                                                                setProductColor(color);
                                                                setDisplayImage(product.images.find((imageSource)=> imageSource.includes(color)) || displayImage);
                                                            }}>
                                        </span>
                                    ))}
                                    <span style={{display:'block', textTransform:'uppercase', paddingLeft:'15px'}}>{productColor}</span>
                                </div>
                                </ListGroupItem>}
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={` ${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                        <Row className='product-info' style={{width: '70%', height:'fit-content'}}>
                            <Row style={{padding: 10}}>
                                <div className='product-info-plate'>
                                    <span style={{paddingBottom:'10px'}}>Specs & Details</span>
                                    <ul style={{fontSize:'14px'}}>
                                        {
                                            Object.keys(product.dimensions).map((dimension) => (
                                                <li>{dimension} : {product.dimensions[dimension]}</li>
                                            ))
                                        }
                                        <li>Warranty : {product.warranty}</li>
                                        {
                                            product.technicalSpecification &&
                                            Object.keys(product.technicalSpecification).map((specification) => (
                                                <li key={specification}>{specification} : {typeof(product.technicalSpecification[specification])==='boolean' ? 
                                                    product.technicalSpecification[specification]? 'yes' : 'false'
                                                :   product.technicalSpecification[specification]
                                                }</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </Row>
                            {/* <Row style={{padding: 10}}>
                                <div className='product-info-plate'>
                                    Compaitability
                                </div>
                            </Row> */}
                        </Row>
                        <Row>
                        <Card className='product-action'>
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
                                        className='blue-button'
                                        type = 'submit'
                                        disabled = {product.countInStock === 0}
                                        onClick = {addToCartHandler}
                                    >
                                        Add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                            
                        </Card>
                        </Row>
                    </Col>
                </Row>
                <Row className='review'>
                    <Col>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No reviews</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map(review=>(
                                <ListGroup.Item key={review.rating}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            {
                            !writeReview?  <Button className='blue-button' onClick={()=>setWriteReview(!writeReview)}>Write a review</Button> :
                            <ListGroup.Item style={{maxWidth: '50%'}}>
                                <h2>Write a Customer Review</h2>
                                {loadingProductReview && <Loader />}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating' className='my-2'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 -Fair</option>
                                                <option value='3'>3 -Good</option>
                                                <option value='4'>4 -Very Good</option>
                                                <option value='5'>5 -Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment' className='my-2'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='primary'
                                        >Submit</Button>
                                    </Form>
                                ) : (
                                    <Message>
                                        Please <Link to='/login'>Sign In</Link> to write a review{''}
                                    </Message>
                                )}
                            </ListGroup.Item>
                            }
                        </ListGroup>
                    </Col>
                </Row>
                </>
        
        )}
    </>
  )
}

export default ProductScreen;