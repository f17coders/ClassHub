import Banner from './../components/Home/Banner'
import Search from './../components/Home/Search'
import Recommend from './../components/Home/Recommend'

function Home() {
	return(
		<div>
			<Banner/>
			<Search/>
			<Recommend title={'🌱 Spring 강의 Best 5'}/>
			<Recommend title={'🎈Git 강의 Best 5'}/>
			<Recommend title={'👍백엔드 개발자에게 추천해요'}/>
		</div>
	)
}

export default Home