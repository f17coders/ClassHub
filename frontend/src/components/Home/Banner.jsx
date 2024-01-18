import Carousel from 'react-bootstrap/Carousel';
import banner1 from './../../assets/banner/banner1.png'
import banner2 from './../../assets/banner/banner2.png'
import banner3 from './../../assets/banner/banner3.png'

function Banner() {
	const banners = [banner1, banner2, banner3]
  return (
    <Carousel>
			{
				banners.map((item, i) => (
					<Carousel.Item key={i}> 
						<img 
							style={{ height : "400px" }}
							className="d-block w-100"
							src={ item }
							alt=""
						/>
					</Carousel.Item>
				))
			}
    </Carousel>
  )
}

export default Banner