import {Col} from 'react-bootstrap'
import '../assets/HomeScreen.style.scss'
import HomeScreenBanner from '../components/HomeScreenBanner';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetNewArrivalsQuery } from '../slices/productsApiSlice';
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice';
import Categories from '../components/Categories';
import NewArrivalCard from '../components/NewArrivalCard';


const HomeScreen = () => {
  const { data: categoriesList, isLoading: categoryIsLoading, error: categoryError } = useGetCategoriesQuery();
  const { data: newArrivals, isLoading: newArrivalsLoader, error: newArrivalsError } = useGetNewArrivalsQuery();

  // const categoriesList = [
  //   { name: 'mice', image: '/images/category-mice.jpeg' },
  //   { name: 'keyboards', image:'/images/category-keyboards.jpeg' },
  //   { name: 'headphones', image:'/images/category-headphones.jpeg' },
  //   { name: 'mousepads', image: '/images/category-mousepads.jpeg' },
  // ];  
  
  return (
    <>
      { categoryIsLoading && newArrivalsLoader ? (
      <Loader/>) : categoryError ? (
        <Message variant="danger">
          { categoryError?.data?.message || categoryError.error}
        </Message>) : newArrivalsError? (<Message>
          { newArrivalsError?.data?.message || newArrivalsError.error}
        </Message> ) : (
        <>
          <HomeScreenBanner />
          {categoryIsLoading ? (<Loader />) :
            <>
              <h1 style={{display:'flex', justifyContent:'center',padding:'10px', fontSize:'35px'} }>Shop By Category</h1>
              <Categories categoriesList = {categoriesList}/>
            </>
          }
          {newArrivalsLoader? (<Loader/>) :
            <>
              <h1 style={{display:'flex', justifyContent:'center',padding:'10px', fontSize:'35px'}} >New Arrivals</h1>
              {newArrivals.map(product => (
                <Col key={product._id} >
                  <NewArrivalCard product={product} />
                </Col>
              ))}
            </>
          } 

        </>
      ) }
    </>
  )
}
export default HomeScreen