import React from 'react'
import { assets } from '../../public/assets/assets'
import Image from 'next/image'
const StartRating = ({rating = 5}) => {
    return (
        <>
            {Array(5).fill('').map((_, index) => (
                <Image  key={index} src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="start-icon" className='w-4.5 h-4.5' />
            ))}
        </>
    )
}

export default StartRating
