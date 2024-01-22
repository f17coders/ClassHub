import { Grid, Box } from '@mui/material'
import LectureCheck from '../../components/Lecture/LectureCheck'
import LectureCompare from '../../components/Lecture/LectureCompare'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import LectureSearch from './../../components/Lecture/LectureSearch'
import LectureCard from './../../components/LectureCard'

import img1 from './../../assets/Lecture/Lecture2.png'

function Lecture() {
	return (
		<Grid container spacing={1} sx={{ width: '90%', margin: 'auto', minHeight: '500px', marginTop: '20px' }}>
			<Grid item xs={5} sm={4} md={2} sx={{ borderRight: "1px solid grey", paddingRight:'30px'}}>
				<h1>전체 강의</h1>
				<Box>
					<LectureCompare/>
				</Box>
				<Box>
					<LectureCheck />
				</Box>
			</Grid>
			<Grid item xs={7} sm={8} md={10}>
				<div style={{ display:'flex' , justifyContent:'space-between', alignItems:'center'}}>
					<h3>전체 강의/웹 개발/백엔드</h3>
					<div style={{ width: '40%', display:'flex'}}>
						<TextField
							id="outlined-multiline-flexible"
							label="원하는 강의를 검색해보세요!"
							style={{ flex: '70%', margin: 5 }}
							size="small"
						/>
						<IconButton style={{ margin: 5 }}><SearchIcon fontSize='small'/></IconButton>
					</div>
				</div>
				<Box>	
					<LectureSearch/>
				</Box>
				<Box sx={{margin:'20px'}}>
					<Grid container spacing={{xs:2, sm:3}}>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
						<Grid item xs={3}>
							<LectureCard img={img1} title='강의제목'/>
						</Grid>
					</Grid>
				</Box>
				<Box sx={{display: 'flex', justifyContent:'center'}}>
					<Stack spacing={2}>
						<Pagination count={10} />
					</Stack>
				</Box>
			</Grid>
		</Grid>
	)
}

export default Lecture