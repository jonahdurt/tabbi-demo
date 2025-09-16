import WidthContainer from './WidthContainer'
import logoNotes from '../assets/images/LogoNotes.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='mt-10 bg-tabbi-light-gray border-t border-black z-50'>
                <WidthContainer>
                    <div className='h-16 pt-1 flex justify-end'>
                        <div className='flex gap-5 md:gap-10 text-sm md:text-[1rem] items-center group'>
                            <a href='https://jonahdurt.com' className='font-semibold text-tabbi-primary hover:text-black transition-all duration-[.25s]'>About Me</a>
                            <Link to='/tutorial' className='font-semibold text-tabbi-primary hover:text-black transition-all duration-[.25s]'>Tutorial</Link>
                            <img src={logoNotes} className='h-6 md:h-8 group-hover:scale-x-[-1] transition-all duration-[.25s] ease-in-out' alt="Tabbi logo"/>
                        </div>
                    </div>
                </WidthContainer>
            </div>
        </>
    )
}

export default Footer