import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useState } from "react";

import '../assets/ProductCard.style.scss';

const Product = ({product}) => {

  const [displayImage, setDisplayImage] = useState(product.cardImage[0]);
  const onColorChange = (color)=>{
    setDisplayImage(
      product.cardImage.find((image)=>{
        return image.includes(color);
      })
    )
  }

  return (
    <>
        <Link to={`/product/${product._id}`} className="ProductCard">
          <Card className="rounded-0 border-0" key={product._id}>
            {product.colors.length>0 && 
            <div key={product._id} style={{position:'absolute', display:'block', top:'5px', left: '5px'}}>
                {
                  product.colors.map((color, id) => 
                  <span style={{width:'25px', 
                  height:'25px', 
                  borderRadius:'50%', 
                  backgroundColor:color, 
                  margin:'5px',
                  borderWidth: '1px ',
                  borderStyle: 'solid',
                  display: 'inline-block',
                  cursor: 'pointer',
                  }}
                  key={id}
                  onClick={(e)=>{e.preventDefault(); onColorChange(color)}}
                  />
                )}
            </div>
            }
            <div className="ProductImage">
                  <Card.Img variant="top" src={displayImage} className="rounded-0" />
            </div>
            <Card.Body style={{backgroundColor:'#f4f4f4'}}>
                <Card.Title className="ProductTitle">{product.name}</Card.Title>
              <div className="ProductDetails">
                  <Card.Title className="ProductType">{product.type}</Card.Title>
                  <Card.Text>
                    ${product.price}
                  </Card.Text>
                  <Card.Text as = 'div'>
                    <Rating value={product.rating}/>
                  </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
    </>
  )
}

export default Product