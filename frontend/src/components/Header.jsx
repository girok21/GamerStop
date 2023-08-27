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
import { debounce } from '../utils/animationHelpers.js';

const Header = ()=>{
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [isNavBarOverlap, setIsNavBarOverLap] = useState(true);

    let location = useLocation();
    // const navBarOverLapPaths = [''];//list of all routes where Navigation Bar is going to overlap(background transparent)

    useEffect(()=>{
        if(location.pathname === '/'){ //home page
            setIsNavBarOverLap(true);
        }else{
            setIsNavBarOverLap(false);
        }
    }, [location]);
//navbar stuffs here----------------------------------------------------------------
    const [hideNavBar, setHideNavBar] = useState(false);
    const [isNavBarSticky, setIsNavBarSticky] = useState(false);
    const [isScrollDown, setIsScrollDown] = useState(false);

    const [currScrollPos, setCurrScrollPos] = useState(0);
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

        // if(currentScrollPosition > 140)
        // {
        //     setIsNavBarSticky(true);
        // }else{
        //     setIsNavBarSticky(false);
        // }
        if(!isScrollDown && currScrollPos>=90){
            setIsNavBarSticky(true);
        }else if(currScrollPos > 140){
            setIsNavBarSticky(true);
        }else{
            setIsNavBarSticky(false);
        }
        });
    }, [currScrollPos, hideNavBar, isScrollDown]);

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
    const searchIconHandler = ()=>{
        console.log('search bar clicked');
    }
    return(
        <header>
            <Navbar className='brand-navigation-bar' 
                    variant="dark" expand="md" 
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
            </Navbar>
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
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className='brand-name'>GamerStop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className = "ms-auto">
                            <Button className='search-icon' 
                                    style={{backgroundColor:'transparent', border: 0 }} 
                                    onClick={searchIconHandler}>
                                <FaSearch/>
                            </Button>
                            <LinkContainer to="/cart">
                                <Nav.Link ><FaShoppingCart/>{cartItems.length>0 && <Badge bg='danger' pill style={{marginLeft:'5px'}}>{cartItems.length}</Badge>}</Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
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
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;