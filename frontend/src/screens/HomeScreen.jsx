import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import '../assets/HomeScreen.style.scss'
import HomeScreenBanner from '../components/HomeScreenBanner';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  
  return (
    <>
      { isLoading ? (
      <Loader/>) : error ? (
        <Message variant="danger">
          { error?.data?.message || error.error}
        </Message>) : (
        <>
          <HomeScreenBanner />
          <h1>Latest Products</h1>
          <Row style={{maxWidth: '100%'}}>
            {products.map(product => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      ) }
    </>
  )
}
export default HomeScreen