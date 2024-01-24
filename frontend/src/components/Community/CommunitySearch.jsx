import { Container, Stack, Button, TextField, Grid, ToggleButton, Autocomplete, IconButton } from '@mui/material';
import { useState, useEffect } from 'react'
import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import SouthIcon from '@mui/icons-material/South'
import NorthIcon from '@mui/icons-material/North';
import Box from '@mui/material/Box'

export default function CommunitySearch(){
	// 태그 검색
	const Tags = ['HTML/CSS', 'JavaScript', 'Node.js', 'React', 'Python','Java','Spring','Spring Boot', 'SQL', 'Django', 'React Native']
	const [selectedButtons, setSelectedButtons] = useState([])
	const handleButtonClick = (value) => {
		if (selectedButtons.includes(value)) {
			setSelectedButtons(selectedButtons.filter((btn) => btn !== value));
		} else {
			setSelectedButtons([...selectedButtons, value]);
		}
	}

    // 토글 열고 닫기
    const [add, setAdd] = useState(false)
	const toggleAdd = function () {
		setAdd(!add)
	}

    return(
        <Container>
            {/* 내용 검색하기 */}
            <Stack direction="row" spacing={1} sx={{ mx: 1, px: 1, mt: 3, width: '100%' }}>
                <TextField size="small" sx={{width:"100%"}} id="outlined-basic" label="궁금한 내용을 검색해보세요" variant="outlined" />
                <IconButton style={{ margin: 2 }}><SearchIcon fontSize='medium' /></IconButton>
            </Stack>
              
            {/* 태그로 검색하기 */}
            <Stack useFlexGap flexWrap="wrap" alignItems="center"  justifyContent="flex-start" direction="row" spacing={1} sx={{ margin: 1, padding: 1 }}>
                {
				add == false ? (
					<Grid container>
						{/* 태그로 검색 */}
						<Grid item style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
							<Autocomplete
								multiple
								id="multiple-limit-tags"
								options={Tags}
								freeSolo
								getOptionLabel={(option) => '#' + option}
								renderInput={(params) => (
									<TextField {...params} label="태그로 검색해보세요" placeholder="" />
								)}
								sx={{ flex: '70%' }}
								size="small"
							/>
							<IconButton style={{ margin: 2 }}><SearchIcon fontSize='medium' /></IconButton>
						</Grid>
						<Grid item style={{ marginLeft: '40px' }}>
							{
								Tags.slice(0,3).map((item, idx) => {
									return (
										<ToggleButton
											key={idx}
											value="item"
											selected={selectedButtons.includes(item)}
											onChange={() => handleButtonClick(item)}
											color='primary'
											size='large'
											sx={{ margin: '4px', height: '35px' }}
										>
											#{item}
										</ToggleButton>
									)
								})
							}
							<IconButton style={{ margin: 5 }} onClick={toggleAdd}>{
								add == false ? (<SouthIcon fontSize='small' />) : (<NorthIcon fontSize='small' />)
							}</IconButton>
						</Grid>

					</Grid>
				    ) : (
					<Grid container>
						{/* 태그로 검색 */}
						<Grid item style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
							<Autocomplete
								multiple
								id="multiple-limit-tags"
								options={Tags}
								freeSolo
								getOptionLabel={(option) => '#' + option}
								renderInput={(params) => (
									<TextField {...params} label="태그로 검색해보세요" placeholder="" />
								)}
								sx={{ flex: '70%' }}
								size="small"
							/>
							<IconButton style={{ margin: 2 }}><SearchIcon fontSize='medium' /></IconButton>
						</Grid>
						<Grid item style={{ marginLeft: '40px' }}>
							{
								Tags.slice(0,3).map((item, idx) => {
									return (
										<ToggleButton
											key={idx}
											value="item"
											selected={selectedButtons.includes(item)}
											onChange={() => handleButtonClick(item)}
											color='primary'
											size='large'
											sx={{ margin: '4px', height: '35px' }}
										>
											#{item}
										</ToggleButton>
									)
								})
							}
							<IconButton style={{ margin: 5 }} onClick={toggleAdd}>{
								add == false ? (<SouthIcon fontSize='small' />) : (<NorthIcon fontSize='small' />)
							}</IconButton>
						</Grid>
						<Box style={{height:'40px', overflow:'hidden', flexWrap:'nowrap', display:'flex'}}>
							<Grid item >
								{
									Tags.slice(3).map((item, idx) => {
										return (
											<ToggleButton
												key={idx}
												value="item"
												selected={selectedButtons.includes(item)}
												onChange={() => handleButtonClick(item)}
												color='primary'
												size='large'
												sx={{ margin: '4px', height: '35px'}}
											>
												#{item}
											</ToggleButton>
										)
									})
								}
							</Grid>
						</Box>
					</Grid>
				    )
                }
            </Stack>
        </Container>
    )
}