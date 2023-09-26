import {Row, Col, NavDropdown,Form} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useGetCategoryQuery } from '../slices/categoriesApiSlice';
import Product from '../components/Product';
import Paginate from '../components/Paginate.jsx';
import { useEffect, useState } from 'react';
import {BiFilter, BiPlus} from 'react-icons/bi';
import '../assets/CategoryScreen.style.scss';
import CategoryHeroBanner from '../screens/CategoryHeroBanner.jsx';

const CategoryScreen = () => {

    const { category } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({category});
    const { data: categoryData, isLoading:categoryIsLoading, error: categoryError} = useGetCategoryQuery({category});
    const [ sortBy, setSortBy ] = useState('FEATURED');
    const [ showFilters, setShowFilters ] = useState(true);
    const [ showConnectivity, setShowConnectivity ] = useState(false)
    const [ showPrice, setShowPrice ] = useState(false);
    const [ showColor, setShowColor ] = useState(false);
    const [ priceFilters, setPriceFilters ] = useState([{min:0, max:0}]);
    // const [ colorChecks, setColorChecks ] = useState(
    //     categoryData.colors.map((color, id)=>{
    //     return { id, name: color, checked: true}
    // }));
    const [ filterQueryOject, setFilterQueryOject ] = useState({ connectivity:[], price:[], colors: []});

    useEffect(()=>{
        if(categoryData){
            const min = categoryData.price.min, max = categoryData.price.max;
            let filterObjectArray = [];
            filterObjectArray.push({min: 0, max: 50 * Math.ceil(min/50)});
            filterObjectArray = [...filterObjectArray,...[...Array((Math.floor(max/50)-Math.ceil(min/50))-1).keys()].map((value)=>{
                            return ({min: ((Math.ceil(min/50) +value)*50), max: ((Math.ceil(min/50) + value+1)*50)})
                        })];
            filterObjectArray.push({min: (Math.floor(max/50)*50), max: max});
            setPriceFilters(filterObjectArray);
            console.log(filterObjectArray);
        }
    }, []);
    console.log(priceFilters)
    const checkboxOnChange = (filterType, filterName) => {
        let filterObjectCopy = {...filterQueryOject};
        // if(filterType !== 'price'){
            const filterIndex = filterObjectCopy[filterType].indexOf(filterName);
            if(filterIndex === -1) {
                filterObjectCopy[filterType] = [...filterObjectCopy[filterType], filterName]
            }else{
                filterObjectCopy[filterType].splice(filterIndex, 1);
            }
        // }else{
        //     const minMaxObject = {min: filterName.split("-")[0], max: filterName.split("-")[1]};
        //     const filterIndex = filterObjectCopy[filterType].indexOf(minMaxObject);
        //     if(filterIndex === -1){
        //         filterObjectCopy[filterType] = [...filterObjectCopy[filterType], minMaxObject];
        //     }else{
        //         filterObjectCopy[filterType].splice(minMaxObject, 1);
        //     }
        // }
        setFilterQueryOject(filterObjectCopy);
        console.log(filterObjectCopy);
    }

    const DropDownItemStyle = {
        display: 'flex',
        height: '58px',
        flexFlow: 'row-reverse',
        width: '306px',
        margin: '0px',
        paddingRight: '15px',
        alignItems: 'center'
    }
    return (
        <>
            {
                isLoading ? <Loader /> : error ? (
                    <Message variant = "danger">
                        {error?.data?.message || error.error}
                    </Message>
                ):(
                    <>
                        {categoryIsLoading? <Loader/> : categoryError? (
                            <Message variant = "danger">{error?.data?.message || categoryError.error}</Message>
                        ) :
                        <>
                        <CategoryHeroBanner categoryData = {categoryData}/>
                        <Row xs={1} md={2} 
                            style={{
                                height:'85px', 
                                backgroundColor:'#f4f4f4',
                                paddingLeft: '100px',
                                paddingRight: '100px',
                                maxWidth: '100vw'
                            }}>
                            <Col
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight:'500', 
                                    color:'#6b7174'
                                }}
                            >
                                <div onClick={()=>setShowFilters(!showFilters)} style={{cursor:'pointer'}}>
                                    <BiFilter style={{width:'24px', height:'24px'}}/>HIDE FILTERS
                                </div>
                            </Col>
                            <Col
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexFlow: 'row-reverse'
                                }}
                            >
                                <NavDropdown id="dropdown-menu-align-end" 
                                            title={`SORT BY: ${sortBy}`} 
                                            style={{background:'transparent', 
                                                    paddingLeft:'50px', 
                                                    fontWeight:'500', 
                                                    color:'#6b7174'}}
                                            align={{ lg: 'end' }}
                                            >
                                    <NavDropdown.Item onClick={()=>setSortBy('FEATURED')} style={DropDownItemStyle}>FEATURED</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>setSortBy('BEST SELLER')} style={DropDownItemStyle}>BEST SELLER</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>setSortBy('PRICE(LOW TO HIGH)')} style={DropDownItemStyle}>{'PRICE(LOW TO HIGH)'}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>setSortBy('PRICE(HIGH TO LOW)')} style={DropDownItemStyle}>{'PRICE(HIGH TO LOW)'}</NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                        </Row>
                        <Row style={{padding:'30px'}}>
                            {showFilters && <Col md={3} style={{}}>
                            <Form>
                                <div className='menu-item'>
                                    <strong onClick={()=>setShowConnectivity(!showConnectivity)}>CONNECTIVITY</strong>
                                    <BiPlus style={{width: '22px', height:'22px', fill:'#1db3e4'}} onClick={()=>setShowConnectivity(!showConnectivity)}/>
                                    {showConnectivity && 
                                    <div className='dropdown'>
                                        <Form.Check
                                            type='checkbox'
                                            label='wired'
                                            key={1}
                                            onChange={()=>{checkboxOnChange('connectivity', 'wired')}}
                                        />
                                        <Form.Check
                                            type='checkbox'
                                            label='wireless'
                                            key={2}
                                            onChange={()=>{checkboxOnChange('connectivity', 'wireless')}}
                                        />                                        
                                    </div>}
                                </div>
                                <div className='menu-item' style={{borderTopWidth:'0px'}}
                                    onClick={()=>setShowPrice(!showPrice)}
                                >
                                    <strong>PRICE</strong>
                                    <BiPlus style={{width: '22px', height:'22px', fill:'#1db3e4'}} onClick={()=>setShowPrice(!showPrice)}/>
                                    {showPrice && 
                                    <div className='dropdown'>
                                        {
                                            priceFilters.map((price, index)=>{
                                                if(index === 0){
                                                    return  <Form.Check
                                                                type= "checkbox"
                                                                label= {`Under $${price.max}`}
                                                                key={index}
                                                                onChange={()=>{checkboxOnChange('price', price)}}
                                                            />
                                                }else if(index === priceFilters.length-1){
                                                    return  <Form.Check
                                                                type= "checkbox"
                                                                label= {`Above $${price.min}`}
                                                                key={index}
                                                                onChange={()=>{checkboxOnChange('price', price)}}
                                                            />
                                                }
                                                return  <Form.Check
                                                            type= "checkbox"
                                                            label= {`$${price.min}-$${price.max}`}
                                                            key={index}
                                                            onChange={()=>{checkboxOnChange('price', price)}}
                                                        />
                                            })
                                        }
                                    </div>}
                                </div>        
                            </Form>
                            </Col>}
                            <Col>
                                <Row style={{paddingBottom: '5px'}}>
                                    {/* <span style={{display: 'inline', width:'fit-content', padding: '3px', backgroundColor: 'lightblue'}}
                                        onClick={(e)=>{ 
                                            e.preventDefault(); 
                                            setFilterArray([]);
                                            const currChecks = colorChecks.map((colorCheck)=> ({...colorCheck, ...{checked: false}}));
                                            setColorChecks(currChecks);
                                        }}
                                    > clear all </span> */}
                                    {/* {filterArray.map((filter, index)=> (<span key={index} style={{display: 'inline', width:'fit-content'}}>{filter}</span>))} */}
                                </Row>
                                <Row xs={2} md={3} className='g-4'>
                                    {
                                        data.products.map(product => (
                                            <Col key={product._id}>
                                                <Product product={product} />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                        </Row>

                        </>}
                    </>
                )
            }
        </>
    )
}

export default CategoryScreen