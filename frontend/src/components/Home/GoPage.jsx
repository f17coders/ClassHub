import { motion } from 'framer-motion'
import GOORM from './../../assets/sites/goorm.png'
import INFLEARN from './../../assets/sites/inflearn.png'
import UDEMY from './../../assets/sites/udemy.png'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

function GoPage() {
    const pages = [
        { name: '인프런', url: 'https://www.inflearn.com/', img: INFLEARN },
        { name: '유데미', url: 'https://www.udemy.com/', img: UDEMY },
        { name: '구름에듀', url: 'https://edu.goorm.io/', img: GOORM },
    ]
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0px' }}>
            <h2>강의 사이트 바로가기</h2>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={container}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {
                    pages.map((page, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            style={{ margin: '0px', paddingRight: '10px' }}
                        >
                            <a href={page.url}>
                                <IconButton style={{ margin: '20px 20px' }}>
                                    <img src={page.img} style={{ width: '40px', borderRadius: '50%', height: '40px' }} />
                                    <p style={{ fontSize: '0.7em' }}>{page.name}</p>
                                </IconButton>
                            </a>

                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default GoPage