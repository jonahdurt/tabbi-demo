import React, { type FormEvent, useState } from 'react'
import DefaultProfilePicture from "../assets/images/DefaultProfilePicture.svg"

interface ProfileBodyProps {
    username: string,
    email: string,
    picture: string,
}

const ProfileBody: React.FC<ProfileBodyProps> = ({ username, email, picture }) => {
    // Editable
    const [isEditing, setIsEditing] = useState(false)

    // Form
    const [newUsername, setNewUsername] = useState<string>('')


    /**
     * Submits form data to api
     *
     * @param event
     */
    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const handleEditProfile = () => {
        setIsEditing(true)
        setNewUsername(username)
    }

    return (
        <>
            {isEditing ? (
                <form onSubmit={submitForm}>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col md:flex-row justify-center gap-10 align-center'>
                            <div className='mb-4'>
                                <img
                                    src={DefaultProfilePicture}
                                    alt='Profile'
                                    className='mb-4 h-[150px] w-[150px] rounded-full'
                                />
                                <label
                                    htmlFor='fileUpload'
                                    className='block text-black font-bold mb-2'>
                                </label>
                                <input
                                    type='file'
                                    disabled
                                    accept='.png,.jpg'
                                    id='fileUpload'
                                    className='file:mr-2  file:bg-tabbi-light-gray file:text-tabbi-med-gray file:border file:border-black file:px-2 file:transition-all file:duration-[.25s]'
                                />
                                <p className='mt-1 text-slate-500 text-[.85em]'>
                                    Accepted file types are .png and .jpg
                                </p>
                            </div>
                            <div className='flex flex-col justify-center gap-4'>
                                <div>
                                    <label htmlFor='email' className='block text-black font-bold mb-2'>
                                        Email:
                                    </label>
                                    <input type='email'
                                        id='email'
                                        value={email}
                                        readOnly
                                        disabled
                                        className='block w-80 h-10 p-2 mt-1'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='' className='block text-black font-bold mb-2'>
                                        Display Name:
                                    </label>
                                    <input type='text'
                                        disabled
                                        value={newUsername}
                                        className='block w-80 h-10 p-2 mt-1'
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row justify-center gap-10 align-center'>
                            <button
                                type='submit'
                                className='h-10 px-3 bg-tabbi-light-gray border text-tabbi-med-gray border-black'
                                disabled
                            >
                                Save Changes
                            </button>
                            <button
                                className='h-10 px-3 font-bold bg-tabbi-primary border border-black text-tabbi-light-gray hover:bg-tabbi-dark-gray transition-all duration-[.25s]'
                                onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className='flex flex-col items-center gap-8'>
                    <div className='flex flex-col md:flex-row justify-center gap-10 items-center'>
                        <div>
                            <img src={picture || DefaultProfilePicture}
                                alt='Profile'
                                className='h-[150px] w-[150px] rounded-full'
                            />
                        </div>
                        <div className='flex flex-col justify-center gap-4 text-md md:text-3xl'>
                            <div>
                                <label className='font-bold'>Email: </label>
                                <span>{email}</span>
                            </div>
                            <div>
                                <label className='font-bold'>Display Name: </label>
                                <span>{username}</span>
                            </div>
                        </div>

                    </div>
                    <button
                        className='h-10 px-3 flex-grow-0 text-xl border border-black bg-tabbi-secondary hover:bg-tabbi-tertiary hover:text-tabbi-light-gray transition-all duration-[.2s]'
                        onClick={handleEditProfile}>
                        edit profile
                    </button>
                    <button
                        className='h-10 px-3 flex-grow-0 text-xl border border-black bg-tabbi-primary text-white hover:bg-black hover:text-tabbi-light-gray transition-all duration-[.2s]'
                        onClick={() => {}}>
                        log out
                    </button>
                </div>
            )}
        </>
    )
}

export default ProfileBody