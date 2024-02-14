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

    const item = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        },
        transition: {
            type: "spring",
            duration: 1.5,
            bounce: 0.2
        }
    };
    const container = {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 1, 
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0px' }}>
            <h2>강의 사이트 바로가기</h2>
            <motion.ol
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
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
            </motion.ol>
        </div>
    )
}

export default GoPage