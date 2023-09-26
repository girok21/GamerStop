import {useGetProductsQuery} from '../slices/productsApiSlice.js';
import Paginate from '../components/Paginate.jsx';
import Product from '../components/Product'
import {Row, Col} from 'react-bootstrap';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

import { useParams }  from 'react-router-dom';

const SearchResultScreen = () => {

    let { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({pageNumber, keyword});
    return (
        <div style={{padding:'50px'}}>
            <h4>Search results for <strong>"{keyword}"</strong>...</h4>
            { isLoading ? <Loader /> : error ? <Message variant= "danger">
                {error?.data?.message || error.error}
            </Message> : 
                <>
                
                {data.products.length === 0? <h5>No products found...</h5> : 
                    (<Row md={4}>
                        {data.products.map((product)=>(
                            <Col key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    )}
                    <Paginate 
                        pages={data.pages}
                        page={data.page}
                        keyword = {keyword ? keyword : ''}
                    />   
                </>
            }  
        </div>
  )
}

export default SearchResultScreen