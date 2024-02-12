import banner1 from './../../assets/banner/banner1.png'
import banner2 from './../../assets/banner/banner2.png'
import banner3 from './../../assets/banner/banner3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

// 홈페이지 메인 배너

function Banner() {
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
					<img src={banner3}  />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner2} style={{width:'100%'}} />
				</SwiperSlide>
				<SwiperSlide>
					<img src={banner1} style={{width:'100%'}} />
				</SwiperSlide>
			</Swiper>
		</div>
	)
}

export default Banner