import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/Categories.style.scss';


const Categories = ({categoriesList}) => {

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: categoriesList.length>=4? 4: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    return (
      <div style={{width:'70%', marginLeft:'auto', marginRight:'auto', textDecoration:'none', textAlign: 'center'}}>
        <Carousel 
            responsive={responsive}
            infinite={true}
        >
        {categoriesList.map((category) =>(
          <Link to={`/collections/${category.name}`} key={category._id}>
            <Card key={category._id}>
                <Card.Img variant="top" src={category.cardImageSource}/>
                <p className="category-title">{category.name}</p>
            </Card>
          </Link>
        ))}
        </Carousel>
      </div>
    )
}

export default Categories