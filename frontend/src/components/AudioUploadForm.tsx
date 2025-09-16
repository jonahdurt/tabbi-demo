import React, { type FormEvent } from 'react'
import { Checkbox, Tooltip } from 'radix-ui'
import { CheckIcon } from '@radix-ui/react-icons'

interface TabCreationProps {
    title: string,
    setTitle: (title: string) => void,
    artist: string,
    setArtist: (artist: string) => void,
    publicState: boolean,
    setPublicState: (publicState: boolean) => void,
    file: File | undefined,
    setFile: (file: File) => void,
    submitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

const AudioUploadForm: React.FC<TabCreationProps> = ({ title, setTitle, artist, setArtist, publicState, setPublicState, file, setFile, submitForm }) => {

    // Selects file for upload
    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        const selectedFiles: FileList = files as FileList
        const selectedFile: File = selectedFiles?.[0]
        setFile(selectedFile)
    }

    return (
        <>
            <form onSubmit={submitForm}>

                {/* Flex row */}
                <div className='flex justify-center gap-12'>

                    {/* Left column */}
                    <div className='flex flex-col justify-start'>

                        {/* Song title */}
                        <div className='m-4'>
                            <label htmlFor='title' className='block text-black font-bold mb-2'>
                                Title
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                className='border border-black bg-white w-full py-2 px-3 mb-2'
                                placeholder='Song title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Artist */}
                        <div className='m-4'>
                            <label htmlFor='artist' className='block text-black font-bold mb-2'>
                                Artist
                            </label>
                            <input
                                type='text'
                                id='artist'
                                name='artist'
                                className='border border-black bg-white w-full py-2 px-3 mb-2'
                                placeholder='Artist'
                                required
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='w-[1px] bg-black'></div>

                    {/* Right column */}
                    <div className='flex flex-col justify-start'>

                        {/* Public */}
                        <div className='m-4'>
                            <div className='flex space-x-2 items-baseline'>
                                <label htmlFor='private' className='block text-black font-bold mb-2'>
                                    Public
                                </label>
                                <Tooltip.Provider>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <button className='inline-flex items-center justify-center rounded-full border-tabbi-med-gray border-2 w-5 h-5 text-tabbi-med-gray text-[.9em]'>?</button>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                className='select-none bg-tabbi-light-gray border border-black drop-shadow-lg p-4 w-60 z-[100] transition-all duration-[.25s]'
                                                side='right'
                                                sideOffset={5}
                                            >
                                                Public uploads can be seen by anyone, while private
                                                uploads can only be seen by the uploader.
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            </div>
                            <Checkbox.Root
                                className='flex size-[25px] appearance-none items-center justify-center border bg-white border-black outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]'
                                id='private'
                                onCheckedChange={() => setPublicState(!publicState)}
                            >
                                <Checkbox.Indicator className='text-black'>
                                    <CheckIcon />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                        </div>

                        {/* File upload */}
                        <div className='m-4'>
                            <label htmlFor='fileUpload' className='block text-black font-bold mb-2'>
                                Audio File
                            </label>
                            <input
                                type='file'
                                accept='.mp3,.wav'
                                id='fileUpload'
                                className='file:mr-2  file:bg-tabbi-tertiary file:hover:bg-black file:text-white file:border file:border-black file:px-2'
                                required
                                onChange={selectFile}
                            />
                            <p className='mt-1 text-slate-500 text-[.85em]'>
                                Accepted file types are .mp3 and .wav
                            </p>
                        </div>


                    </div>
                </div>
                {/* Submit button */}
                <div className="flex justify-center mt-10">
                    {/* <button
                        className='bg-tabbi-secondary hover:bg-tabbi-primary text-black text-lg font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-[.25s]'
                        type='submit'
                    > */}
                        {/* Create Tab
                    </button> */}
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button
                                    className='bg-tabbi-secondary hover:bg-tabbi-primary text-black text-lg font-bold hover:cursor-pointer py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-[.25s]'
                                    disabled
                                >
                                    Create Tab
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    className='select-none bg-tabbi-light-gray border border-black drop-shadow-lg p-4 w-60 z-[100] transition-all duration-[.25s]'
                                    side='right'
                                    sideOffset={5}
                                >
                                    Because this is a demo of the full site, tab creation isn't possible.
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>

            </form>
        </>
    )
}

export default AudioUploadForm