import banner1 from './../../assets/banner/banner1.png'
import banner2 from './../../assets/banner/banner2.png'
import banner3 from './../../assets/banner/banner3.png'
import {useState} from 'react'
import ItemsCarousel from 'react-items-carousel'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import IconButton from '@mui/material/IconButton'

// 홈페이지 메인 배너

function Banner() {
	const [activeItemIndex, setActiveItemIndex] = useState(0)

	return (
		<div>
			<ItemsCarousel
			  infiniteLoop
				requestToChangeActive={setActiveItemIndex}
				activeItemIndex={activeItemIndex}
				numberOfCards={1}
				gutter={20}
				leftChevron={<IconButton><KeyboardArrowLeftIcon/></IconButton>}
				rightChevron={<IconButton><KeyboardArrowRightIcon/></IconButton>}
			>
				<div style={{ height: '100%'}}>
					<img src={banner3} alt="" />
				</div>
				<div style={{ height: '100%'}}>
					<img src={banner2} alt="" />
				</div>
				<div style={{ height: '100%'}}>
					<img src={banner1} alt="" />
				</div>
			</ItemsCarousel>
		</div>
	)
}

export default Banner

// Bootstrap 쓸 때

// import Carousel from 'react-bootstrap/Carousel';
// function Banner() {
// 	const banners = [banner1, banner2, banner3]
//   return (
//     <Carousel>
// 			{
// 				banners.map((item, i) => (
// 					<Carousel.Item key={i}> 
// 						<img 
// 							style={{ height : "400px" }}
// 							className="d-block w-100"
// 							src={ item }
// 							alt=""
// 						/>
// 					</Carousel.Item>
// 				))
// 			}
//     </Carousel>
//   )
// }

// export default Banner