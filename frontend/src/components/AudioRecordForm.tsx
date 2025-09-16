import { CheckIcon } from '@radix-ui/react-icons'
import { Checkbox, Tooltip } from 'radix-ui'
import React, { type FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize'
import { FFmpeg } from '@ffmpeg/ffmpeg';

interface TabCreationProps {
    title: string,
    setTitle: (title: string) => void,
    artist: string,
    setArtist: (artist: string) => void,
    publicState: boolean,
    setPublicState: (publicState: boolean) => void,
    file: File | undefined,
    setFile: (file: File | undefined) => void,
    submitForm: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

const AudioRecordForm: React.FC<TabCreationProps> = ({ title, setTitle, artist, setArtist, publicState, setPublicState, file, setFile, submitForm }) => {

    const [isRecording, setIsRecording] = useState<boolean>(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const visualizerRef = useRef<HTMLCanvasElement>(null)

    const ffmpegRef = useRef<FFmpeg | null>(null)
    const [ffmpegLoading, setFFmpegLoading] = useState<boolean>(true)

    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadFFmpeg = async () => {
            const ffmpegInstance = new FFmpeg()
            try {
                await ffmpegInstance.load()
                ffmpegRef.current = ffmpegInstance
            } catch (error) {
                console.error('Error loading FFmpeg:', error)
            } finally {
                setFFmpegLoading(false)
            }
        }

        loadFFmpeg()

        return () => {
            if (mediaRecorderRef.current)
                stopRecording()

            if (ffmpegRef.current) {
                ffmpegRef.current.terminate()
            }

            if (downloadUrl) {
                URL.revokeObjectURL(downloadUrl); // Clean up the object URL
            }
        }
    }, [])

    const onAudioFileReady = (file: File) => {
        setFile(file)

        setDownloadUrl(URL.createObjectURL(file))
    }

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = async () => {
                const webmBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                setAudioBlob(webmBlob)

                if (!ffmpegRef.current) {
                    console.error('FFmpeg not loaded yet')
                    return
                }

                try {
                    const filenameWebm = 'input.webm'
                    const filenameMp3 = 'output.mp3'

                    console.log('checkpoint 1')

                    // Write the webm blob to ffmpeg file system
                    const arrayBuffer = await webmBlob.arrayBuffer()
                    await ffmpegRef.current.writeFile(filenameWebm, new Uint8Array(arrayBuffer))

                    console.log('checkpoint 2')


                    // Run FFmpeg command to convert WebM to MP3
                    await ffmpegRef.current.exec(['-i', filenameWebm, '-vn', '-acodec', 'libmp3lame', filenameMp3])

                    console.log('checkpoint 3')


                    // Read the resulting MP3 file from FFmpeg's virtual filesystem
                    const mp3Data: any = await ffmpegRef.current.readFile(filenameMp3)
                    const mp3Blob = new Blob([mp3Data], { type: 'audio/mpeg' })
                    const mp3File = new File([mp3Blob], 'recorded_audio.mp3')

                    onAudioFileReady(mp3File)

                } catch (error) {
                    console.error('Error during FFmpeg conversion:', error)

                } finally {
                    // setFFmpegLoading(false)
                    // Clean up virtual files
                    await ffmpegRef.current.deleteFile('input.webm')
                    await ffmpegRef.current.deleteFile('output.mp3')
                    stream.getTracks().forEach(track => track.stop())
                }
            }

            mediaRecorder.start()
            setIsRecording(true)
            console.log('Recording started')

        } catch (error) {
            console.error('Error starting recording:', error)
        }
    }, [onAudioFileReady])

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop()
            console.log('Recording stopped')
        }
        setIsRecording(false)
    }, [])

    const toggleRecording = useCallback(() => {
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    }, [isRecording, startRecording, stopRecording])

    const clearRecording = () => {
        setAudioBlob(null)
        setFile(undefined)
        setDownloadUrl(null)
    }

    return (
        <>
            <form onSubmit={submitForm}>

                {/* Flex row */}
                <div className='flex flex-col md:flex-row justify-center md:gap-12'>

                    {/* Left column */}
                    <div className='flex flex-col justify-start'>

                        {/* Song title */}
                        <div className='mx-4 my-2'>
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
                        <div className='mx-4 my-2'>
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

                        {/* Public */}
                        <div className='mx-4 my-2'>
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
                    </div>

                    {/* Divider */}
                    <div className='w-[1px] bg-black'></div>

                    {/* Audio recorder */}
                    <div className='m-4 flex flex-col justify-center self-center gap-2'>
                        <div className='flex gap-2 items-center'>
                            <button
                                className={`h-8 w-16 border border-black disabled:border-tabbi-med-gray disabled:text-tabbi-med-gray disabled:hover:bg-tabbi-light-gray hover:cursor-pointer ${isRecording ? 'bg-tabbi-primary text-tabbi-light-gray' : 'bg-tabbi-light-gray hover:bg-tabbi-med-gray'}`}
                                onClick={toggleRecording}
                                type='button'
                                disabled={audioBlob !== null}
                            >
                                {isRecording ? 'stop' : 'record'}
                            </button>

                            <button
                                className='h-8 w-16 border border-black hover:bg-tabbi-med-gray disabled:border-tabbi-med-gray disabled:text-tabbi-med-gray disabled:hover:bg-tabbi-light-gray hover:cursor-pointer disabled:hover:cursor-default'
                                onClick={clearRecording}
                                disabled={audioBlob === null || isRecording}
                            >
                                reset
                            </button>


                            {file && file !== undefined
                                &&
                                <p className='ml-4'>Ready to upload!</p>
                            }

                            {downloadUrl && (
                                <a href={downloadUrl} download="recorded_audio.mp3" className="ml-4 text-blue-500 hover:underline">
                                    Download MP3
                                </a>
                            )}
                        </div>

                        {/* Visualizer */}
                        <div className='h-[75px] w-[250px] md:h-[150px] md:w-[500px] border border-black bg-tabbi-dark-gray'>
                            <div className='scale-50 md:scale-100 origin-top-left'>
                                {isRecording
                                    ?
                                    (
                                        mediaRecorderRef.current &&
                                        <>
                                            <LiveAudioVisualizer
                                                mediaRecorder={mediaRecorderRef.current}
                                                width={500}
                                                height={150}
                                                barWidth={2}
                                                gap={1}
                                                barColor={'#b3de00'}
                                            />
                                        </>
                                    )
                                    :
                                    (
                                        audioBlob &&
                                        <>
                                            <AudioVisualizer
                                                ref={visualizerRef}
                                                blob={audioBlob}
                                                width={500}
                                                height={150}
                                                barWidth={2}
                                                gap={1}
                                                barColor={'#b3de00'}
                                            />
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center mt-10">
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
                                    You can, however, record audio, view the wavefile, and download the recorded
                                    file above.
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>

                </div>
            </form>
        </>
    )
}

export default AudioRecordForm