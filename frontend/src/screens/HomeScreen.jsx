import {Row, Col} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product'
import '../assets/HomeScreen.style.scss'
import HomeScreenBanner from '../components/HomeScreenBanner'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchedProducts = async ()=> {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      console.log(response.data);
    };
    fetchedProducts();
  }, [])
  return (
    <>
        <HomeScreenBanner />
        <h1>Latest Products</h1>
        <Row>
          {products.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
    </>
  )
}
export default HomeScreen