import { Button, Card } from 'react-bootstrap';
import { FaProductHunt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const NewArrivalCard = ({product}) => {
   
    const navigate = useNavigate();

    const redirectProduct = (product) => {
        navigate(`/product/${product._id}`);
    }
  return (
    <div>
        <Card style={{display: 'flex', flexDirection: 'row', margin:'0px', border:'none'}}>
            <Card.Img variant='top' src={product.cardImage[0]} style={{width:'60%', padding: '80px'}}/>
            <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'center', borderRadius:'0px'}}>
                <Card.Title style={{maxWidth:'60%'}}>{product.name}</Card.Title>
                <Card.Text style={{maxWidth:'60%'}}>{product.description}</Card.Text>
                <Button className='blue-button' onClick={(e)=>{e.preventDefault(); redirectProduct(product)}}>
                    Shop Now
                </Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default NewArrivalCard;