import {Navbar, Nav, Container, Form, Col, Row, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import '../assets/header.style.scss'
import hyperxLogo from '../assets/logo/hyperx-logo.svg'
import logitechLogo from '../assets/logo/logitech-logo.svg'
import steamLogo from '../assets/logo/steam-logo.svg'
import razerLogo from '../assets/logo/razer-logo.svg';

const Header = ()=>{
    const { cartItems } = useSelector((state) => state.cart);
    console.log(cartItems);
    return(
        <header>
            <Navbar className='brand-navigation-bar' variant="dark" expand="md" collapseOnSelect>
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
            <Navbar className='navigation-bar' variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className='brand-name'>GamerStop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className = "ms-auto">
                            {/* <Form.Control type='text' placeholder='SEARCH' /> */}
                            <LinkContainer className='nav-bar-icon' to="/cart">
                                <Nav.Link ><FaShoppingCart/>{cartItems.length>0 && <Badge bg='danger' pill style={{marginLeft:'5px'}}>{cartItems.length}</Badge>}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer className='nav-bar-icon' to='/login'>
                                <Nav.Link><FaUser/></Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;