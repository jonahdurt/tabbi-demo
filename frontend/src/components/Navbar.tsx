import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import defaultProfilePicture from "../assets/images/DefaultProfilePicture.svg"
import WidthContainer from './WidthContainer'
import logo from "../assets/images/Logo.svg"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const username: string = 'demo-user'

    const [query, setQuery] = useState<string>('')
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false)
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false)

    const NavLinks = ({onClick}: {onClick?: () => void}) => {
        return (
            <div className='flex flex-none max-w-60 min-w-80 gap-2 md:gap-4 items-center justify-between text-tabbi-primary font-semibold text-[1rem]'>
                <Link
                    to='/mytabs'
                    className={`p-2 lg:p-3 hover:underline text-center ${location.pathname === '/mytabs' ? 'bg-tabbi-primary text-tabbi-light-gray' : 'text-tabbi-primary'}`}
                    onClick={onClick}
                >
                    My Tabs
                </Link>
                <Link
                    to='/new-tab'
                    className={`p-2 lg:p-3 hover:underline text-center ${location.pathname === '/new-tab' ? 'bg-tabbi-primary text-tabbi-light-gray' : 'text-tabbi-primary'}`}
                    onClick={onClick}
                >
                    Create Tabs
                </Link>
                <Link
                    to='/tuner'
                    className={`p-2 lg:p-3 hover:underline text-center ${location.pathname === '/tuner' ? 'bg-tabbi-primary text-tabbi-light-gray' : 'text-tabbi-primary'}`}
                    onClick={onClick}
                >
                    Tuner
                </Link>
            </div>
        )
    }

    const SearchForm = () => {
        return (
            <form
                className='flex items-center shrink'
                onSubmit={(event: React.FormEvent) => {
                    event.preventDefault()
                    if (query && query.trim() !== '') {
                        navigate(`/search?query=${encodeURIComponent(query)}`)
                    } else {
                        //TODO: maybe show toast
                    }
                    setQuery('')
                    setNavMenuOpen(false)
                }}>
                <input
                    className="px-3 h-8 border border-black bg-white mr-2 placeholder:text-sm "
                    type="text"
                    id="query"
                    name="query"
                    placeholder='title, artist, user...'
                    value={query ? query : ''}
                    onChange={(e) => setQuery(e.target.value)}
                // defaultValue={urlQuery ? urlQuery : ''}
                />
                <button
                    className="bg-tabbi-tertiary border border-black text-white px-3 h-8 hover:bg-tabbi-dark-gray transition-all duration-[.2s] hover:cursor-pointer"
                    type='submit'>
                    Search
                </button>
            </form>
        )
    }

    return (
        <>
            <div className='bg-tabbi-light-gray w-full border-b border-black z-20'>
                <WidthContainer>
                    <div className="relative bg-tabbi-light-gray flex w-full items-center justify-between pt-4 pb-2 gap-6">

                        <Link to='/' className="flex flex-none items-center h-full md:mb-2">
                            <img src={logo} alt="Tabbi" className='min-w-18 md:min-w-24' />
                        </Link>

                        {/* Navigation links */}
                        <div className='hidden lg:block'>
                            <NavLinks />
                        </div>

                        <div className='absolute block lg:hidden top-1/2 left-1/2 -translate-x-1/2 translate-y-1 h-full hover:cursor-pointer'>
                            <div
                                className={`h-3 w-3 border-b-3 border-l-3 ml-1 border-black ${navMenuOpen ? 'rotate-[135deg]' : '-rotate-45'} transition-all duration-[.2s]`}
                                onClick={navMenuOpen ? () => setNavMenuOpen(false) : () => setNavMenuOpen(true)}
                            />
                        </div>

                        {/* Search form */}
                        <div className='hidden lg:flex'>
                            <SearchForm />
                        </div>

                        {/* Log in/out button, username, and profile picture */}
                        <div className="hidden lg:flex space-x-3 items-center justify-center">
                            <button
                                onClick={profileMenuOpen ? () => setProfileMenuOpen(false) : () => setProfileMenuOpen(true)}
                                className='flex hover:cursor-pointer'>
                                <div className="flex gap-2 items-center text-l">
                                    <p className='hidden lg:block whitespace-nowrap'>
                                        {username}
                                    </p>
                                    <img
                                        className="h-10 min-w-10 md:h-12 md:min-w-12 rounded-full object-cover"
                                        src={defaultProfilePicture}
                                        alt="Profile Picture"
                                    />
                                    <div className={`h-2 w-2 border-b-2 border-l-2 ml-1 border-black ${profileMenuOpen ? 'rotate-[135deg]' : '-rotate-45'
                                        } transition-all duration-[.2s]`}
                                    />
                                </div>
                            </button>

                            <div
                                className={`absolute ${!profileMenuOpen ? '-top-12' : 'top-[3.9rem] md:top-[5rem]'} right-0 flex flex-col justify-center items-center gap-5 min-w-36 border-1 border-tabbi-dark-gray bg-tabbi-light-gray py-4 -z-[1] transition-all duration-[.2s]`}
                            >
                                <Link
                                    to="/user/profile"
                                    className="text-l border border-tabbi-dark-gray p-1 w-[90px] text-center hover:bg-tabbi-med-gray hover:text-white"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    className="bg-tabbi-primary text-white px-3 w-[90px] hover:bg-tabbi-dark-gray hover:text-tabbi-primary h-8 transition-all duration-[.2s]"
                                    onClick={() => { }}>
                                    Log Out
                                </button>
                            </div>
                        </div>

                        <Link
                            className='flex lg:hidden'
                            to='/user/profile'
                        >
                            <img
                                className="h-12 min-w-12 rounded-full object-cover"
                                src={defaultProfilePicture}
                                alt="Profile Picture"
                            />
                        </Link>
                    </div>

                </WidthContainer>
            </div>
            <div
                className={`${!navMenuOpen ? 'h-0 border-0 -translate-y-2' : 'h-32 py-4 border-b-1'} flex overflow-hidden lg:hidden flex-col justify-center items-center gap-4 pt-2 min-w-36 border-tabbi-dark-gray bg-tabbi-light-gray transition-all duration-[.2s]`}
            >
                <NavLinks onClick={() => setNavMenuOpen(false)}/>
                <SearchForm />
            </div>
        </>
    )
}

export default Navbar
