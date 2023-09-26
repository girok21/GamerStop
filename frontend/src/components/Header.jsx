import {useNavigate} from 'react-router-dom';
import {Navbar, Nav, Container, Button,  Form, Col, Row, Badge, NavDropdown, NavItem } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/header.style.scss'
import hyperxLogo from '../assets/logo/hyperx-logo.svg'
import logitechLogo from '../assets/logo/logitech-logo.svg'
import steamLogo from '../assets/logo/steam-logo.svg'
import razerLogo from '../assets/logo/razer-logo.svg';
import {logout} from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBox from '../components/SearchBox.jsx';
import { GrClose } from "react-icons/gr";




const Header = ()=>{
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [isNavBarOverlap, setIsNavBarOverLap] = useState(true);

    const [hideNavBar, setHideNavBar] = useState(false);
    const [isNavBarSticky, setIsNavBarSticky] = useState(false);
    const [isScrollDown, setIsScrollDown] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);  
    const [currScrollPos, setCurrScrollPos] = useState(0);

    let location = useLocation();
    // const navBarOverLapPaths = [''];//list of all routes where Navigation Bar is going to overlap(background transparent)

    useEffect(()=>{

        console.log('here');
        setHideNavBar(false);
        setIsNavBarSticky(false);
        setIsScrollDown(false);
        setShowSearchBar(false);
        setCurrScrollPos(0);

        if(location.pathname === '/' || location.pathname.includes('collections')){ //home page
            setIsNavBarOverLap(true);
        }else{
            setIsNavBarOverLap(false);
        }
        // console.log(isNavBarOverlap, isNavBarSticky, isScrollDown, showSearchBar, hideNavBar)
    }, [location]);
    
//navbar stuffs here----------------------------------------------------------------
useEffect(() => {
        let currentScrollPosition = 0;

        window.addEventListener('scroll', function (e) {

        // Get the new Value
        currentScrollPosition = window.pageYOffset;

        if(currScrollPos - currentScrollPosition < 0){
            setIsScrollDown(true);
        }else{
            setIsScrollDown(false);
        }

        if (isScrollDown ) {
            if(currScrollPos > 90)
                setHideNavBar(true);
        } else {
            setHideNavBar(false);
        }
        setCurrScrollPos(currentScrollPosition);
        if(isNavBarOverlap && !isScrollDown && currScrollPos>=90){
            setIsNavBarSticky(true);
        }else if(isNavBarOverlap && currScrollPos > 90){
            setIsNavBarSticky(true);
        }else{
            setIsNavBarSticky(false);
        }
        });
    }, [currScrollPos, hideNavBar, isScrollDown,isNavBarOverlap]);

    const styles = {
        active: {
          visibility: "visible",
          transition: "all 0.5s"
        },
        hidden: {
          visibility: "hidden",
          transition: "all 0.5s",
          transform: "translateY(-100%)"
        }
      }

//----------------------------------------------------------------

    const logoutHandler = async()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <header>
            {/* <Navbar className='brand-navigation-bar' 
                    expand="md" 
                    collapseOnSelect 
                    >
                <Container className='brand-navigation-container'>
                    <Container className='brand-navbar-text'>BRAND PARTNERS</Container>
                    <Container className='brand-partners-container'>
                        <Row>
                            <Col className='brand-partner-link'>
                                <a href="https://hyperx.com" className='brand-partner-name' target='_blank' rel="noopener noreferrer">
                                    <img className='partner-brand-logo' src={hyperxLogo} alt='hyperx logo'></img>    
                                </a>
                            </Col>      
                            <Col className='brand-partner-link'>
                                <a href="https://www.logitechg.com/en-in" className='brand-partner-name' target='_blank' rel="noopener noreferrer">
                                    <img className='partner-brand-logo' src={logitechLogo} alt='logitech logo'></img>
                                </a>
                            </Col>
                            <Col className='brand-partner-link'>
                                <a href="https://www.razer.com/" className='brand-partner-name' target='_blank' rel="noopener noreferrer">
                                    <embed className='partner-brand-logo' src={razerLogo} alt='razer logo'></embed>    
                                </a>
                            </Col> 
                            <Col className='brand-partner-link'>
                                <a href="https://store.steampowered.com/" className='brand-partner-name' target='_blank' rel="noopener noreferrer">
                                    <img className='partner-brand-logo' src={steamLogo} alt='steam logo'></img>    
                                </a>
                            </Col> 
                        </Row>
                    </Container>
                </Container>
            </Navbar> */}
            <Navbar className='navigation-bar' 
                    variant="dark" expand="md" 
                    collapseOnSelect
                    // style={isNavBarOverlap ? {position: 'absolute' , background: 'transparent'} : {}}
                    {...(isNavBarSticky ? {fixed:'top'}: {})}
                    // hidden={hideNavBar}>
                    // style={!hideNavBar ? styles.active: styles.hidden}
                    style = {{...(isNavBarOverlap && !isNavBarSticky ? {position:'absolute', background: 'transparent'}: {}), 
                              ...(!hideNavBar ? styles.active: styles.hidden)}}
                    >
                {showSearchBar && 
                    <div style={{display:'flex', width:'100vw',justifyContent:'center', background: 'white'}}>
                        <SearchBox />
                        <Button onClick={()=>setShowSearchBar(!showSearchBar)}
                            style={{height:'90px', 
                                    width:'150px', 
                                    borderRadius:'0px', 
                                    background:'transparent', 
                                    border:'0px',
                                    }}>
                            <GrClose/>
                        </Button>
                    </div>}
                {!showSearchBar && 
                <Container>                    
                    <LinkContainer to="/">
                        <Navbar.Brand className='brand-name'>GamerStop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className = "ms-auto">
                            <Button className='search-icon' 
                                    style={{backgroundColor:'transparent', border: 0 }} 
                                    onClick={()=>setShowSearchBar(!showSearchBar)}>
                                <FaSearch/>
                            </Button>
                            <LinkContainer to="/cart">
                                <Nav.Link ><FaShoppingCart/>{cartItems.length>0 && <Badge bg='danger' pill style={{marginLeft:'5px', padding:'0px'}}>{cartItems.length}</Badge>}</Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.isAdmin? 'ADMIN':userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    {userInfo.isAdmin && 
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Order List</NavDropdown.Item>
                                    </LinkContainer>}
                                    {userInfo.isAdmin && 
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>User List</NavDropdown.Item>
                                    </LinkContainer>}
                                    {userInfo.isAdmin && 
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Product List</NavDropdown.Item>
                                    </LinkContainer>}
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        LogOut
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer  to='/login'>
                                <Nav.Link><FaUser className='nav-bar-icon'/></Nav.Link>
                            </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>}
            </Navbar>
        </header>
    )
}

export default Header;