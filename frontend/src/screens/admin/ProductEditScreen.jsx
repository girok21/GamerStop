import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message.jsx'
import Loader from '../../components/Loader.jsx';
import FormContainer from '../../components/FormContainer.jsx';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
    const{ id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);

    const [updateProduct, {isLoading: loadingUpdateProduct}] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if(product){
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setImage(product.image);
        }
    }, [product])

    const submitHandler = async(e)=>{
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        } else {
            toast.success('Product updated');
            navigate('/admin/productlist');
        }
    }

    const uploadFileHandler = async (e) =>{
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.log(err)
        }

    }

  return (
    <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdateProduct && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :(
                <Form onSubmit={ submitHandler }>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage}
                        ></Form.Control>
                        <Form.Control
                            label='Choose File'
                            onChange={uploadFileHandler}
                            type='file'
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Brand Name"
                            value={brand}
                            onChange={(e)=> setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Count In Stock"
                            value={countInStock}
                            onChange={(e)=> setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Category"
                            value={category}
                            onChange={(e)=> setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        className="my-2"
                    >
                        UPDATE
                    </Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen;