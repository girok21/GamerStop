import { Image } from 'react-bootstrap';
// import Banner from '../assets/images/category/hero-gaming-mice-desktop.jpeg'

const CategoryHeroBanner = ({categoryData}) => {
  return (
    <>
        <Image src={categoryData.screenImageSource} alt="hero banner"/>
        <div className='banner-text'
            style={{
                color: 'white',
                position: 'absolute',
                top: '220px',
                left: '50px',
                width: '500px',
                paddingLeft: '100px',
            }}
        >
            <h2 style={{
                fontWeight: '640',
                textTransform: 'uppercase',
                fontSize: '48px'
            }}>{categoryData.name}</h2>
            
                <div style={{   //underline beneath title
                    width: '80px',
                    height: '5px',
                    backgroundColor: '#c3c6c8',
                    marginTop: '25px',
                    marginBottom: '25px',
                }}/>
            <span>{categoryData.description}</span>
        </div>
    </>
  )
}

export default CategoryHeroBanner;