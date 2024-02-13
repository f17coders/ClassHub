import banner1 from './../../assets/banner/banner1.png'
import banner2 from './../../assets/banner/banner2.png'
import banner3 from './../../assets/banner/banner3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

// 홈페이지 메인 배너

function Banner() {
	const bannerStyle = {
		width:'100%',
		height: 'auto',
		maxWidth: '100%',
		maxHeight: '100%'
	}
	return (
		<div>
			<Swiper 
			navigation={true} 
			modules={[Navigation, Autoplay]} 
			loop={true} 
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}>
				<SwiperSlide>
					<img src={banner3} style={bannerStyle} />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner2} style={bannerStyle} />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner1} style={bannerStyle} />
				</SwiperSlide>
			</Swiper>
		</div>
	)
}

export default Banner