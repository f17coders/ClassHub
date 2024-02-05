import banner1 from './../../assets/banner/banner1.png'
import banner2 from './../../assets/banner/banner2.png'
import banner3 from './../../assets/banner/banner3.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

// 홈페이지 메인 배너

function Banner() {
	// const [activeItemIndex, setActiveItemIndex] = useState(0)

	return (
		<div>
			<Carousel
				autoPlay
				infiniteLoop
				interval={7000}
				showStatus={false}
				showThumbs={false}
				transitionTime={1000}
			>
				<div style={{ height: '100%' }}>
					<img src={banner3} alt="" />
				</div>
				<div style={{ height: '100%' }}>
					<img src={banner2} alt="" />
				</div>
				<div style={{ height: '100%' }}>
					<img src={banner1} alt="" />
				</div>
			</Carousel>
		</div>
	)
}

export default Banner