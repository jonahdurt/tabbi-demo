import defaultProfilePicture from "../assets/images/PageNotFound.svg"
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className='text-center flex flex-col justify-center items-center h-96 my-16'>
        <img className="h-40 w-auto" src={defaultProfilePicture} />

        <div className='leading-16 md:leading-12 mt-4 text-5xl text-center text-black font-semibold'>
            Page not found
        </div>
        <div className='mt-6 text-2xl text-center'>Click <Link className='font-bold text-tabbi-primary'to='/'>here</Link> to go home</div>
    </section>
  )
}

export default NotFoundPage