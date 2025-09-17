import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import VolumeOnIcon from '../assets/images/VolumeOnIcon.svg'
import PlayButton from '../assets/images/PlayButton.svg'
import PauseButton from '../assets/images/PauseButton.svg'
import StopButton from '../assets/images/StopButton.svg'
import { AudioVisualizer } from 'react-audio-visualize'
import { Slider, Tooltip } from "radix-ui"
import original from '../assets/audio/wide-awake/original.mp3'
import other from '../assets/audio/wide-awake/other.wav'
import vocals from '../assets/audio/wide-awake/vocals.wav'
import bass from '../assets/audio/wide-awake/bass.wav'
import drums from '../assets/audio/wide-awake/drums.wav'

interface AudioPlayerProps {
    originalSrc: string | null
    otherSrc: string | null
    vocalSrc: string | null
    bassSrc: string | null
    drumSrc: string | null
    onIsPlayingChange: (isPlaying: boolean) => void
}

interface AudioPlayerHandle {
    getCurrentTime: () => number | undefined
}

const AudioPlayer = forwardRef<AudioPlayerHandle, AudioPlayerProps>(({ originalSrc = null, otherSrc = null, vocalSrc = null, bassSrc = null, drumSrc = null, onIsPlayingChange }, ref) => {


    // Constants
    const SLIDER_FIDELITY = 1000

    // Stored audio sources
    const originalSrcRef = useRef<string>('../assets/audio/wide-awake/original.mp3')
    const otherSrcRef = useRef<string>('../assets/audio/wide-awake/other.wav')
    const vocalSrcRef = useRef<string>('../assets/audio/wide-awake/vocals.wav')
    const bassSrcRef = useRef<string>('../assets/audio/wide-awake/bass.wav')
    const drumSrcRef = useRef<string>('../assets/audio/wide-awake/drums.wav')

    // For track storage and audio visualization

    const [originalBlob, setOriginalBlob] = useState<Blob | null>(null)
    const [otherBlob, setOtherBlob] = useState<Blob | null>(null)
    const [vocalBlob, setVocalBlob] = useState<Blob | null>(null)
    const [bassBlob, setBassBlob] = useState<Blob | null>(null)
    const [drumBlob, setDrumBlob] = useState<Blob | null>(null)
    const visualizerRef = useRef<HTMLCanvasElement>(null)

    // General audio controls
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [multitrackMode, setMultitrackMode] = useState<boolean>(false)

    // Looper controls
    const [isLooping, setIsLooping] = useState(false)
    const [loopStart, setLoopStart] = useState(0)
    const [loopEnd, setLoopEnd] = useState(SLIDER_FIDELITY)

    // Track audio elements
    const originalRef = useRef<HTMLAudioElement | null>(null)
    const otherRef = useRef<HTMLAudioElement | null>(null)
    const vocalRef = useRef<HTMLAudioElement | null>(null)
    const bassRef = useRef<HTMLAudioElement | null>(null)
    const drumRef = useRef<HTMLAudioElement | null>(null)

    // Track volume controls
    const [originalVolume, setOriginalVolume] = useState(1)
    const [otherVolume, setOtherVolume] = useState(1)
    const [vocalVolume, setVocalVolume] = useState(1)
    const [bassVolume, setBassVolume] = useState(1)
    const [drumVolume, setDrumVolume] = useState(1)


    // Get blobs for audio storage and visualization
    useEffect(() => {
        const fetchAudio = async () => {
            const [res1, res2, res3, res4, res5] = await Promise.all([
                fetch(original).then(res => res.blob()),
                fetch(other).then(res => res.blob()),
                fetch(vocals).then(res => res.blob()),
                fetch(bass).then(res => res.blob()),
                fetch(drums).then(res => res.blob())
            ])

            setOriginalBlob(res1)
            setOtherBlob(res2)
            setVocalBlob(res3)
            setBassBlob(res4)
            setDrumBlob(res5)
        }

        fetchAudio()

        return () => {
            if (originalSrcRef.current)
                URL.revokeObjectURL(originalSrcRef.current)
            if (otherSrcRef.current)
                URL.revokeObjectURL(otherSrcRef.current)
            if (vocalSrcRef.current)
                URL.revokeObjectURL(vocalSrcRef.current)
            if (bassSrcRef.current)
                URL.revokeObjectURL(bassSrcRef.current)
            if (drumSrcRef.current)
                URL.revokeObjectURL(drumSrcRef.current)
        }
    }, [originalSrc, otherSrc, vocalSrc, bassSrc, drumSrc])


    // Used by parent component to get current time of audio playing
    useImperativeHandle(ref, () => ({
        getCurrentTime: () => {
            if (multitrackMode) {
                return otherRef.current?.currentTime
            } else {
                return originalRef.current?.currentTime
            }
        }
    }))


    // Handle Multitrack button press
    const handleMultitrackOn = () => {
        setIsPlaying(false)
        onIsPlayingChange(false)
        setCurrentTime(0)
        setMultitrackMode(true)
        setOtherVolume(1)
        setVocalVolume(1)
        setBassVolume(1)
        setDrumVolume(1)
        setIsLooping(false)
    }

    // Handle Original button press
    const handleMultitrackOff = () => {
        setIsPlaying(false)
        onIsPlayingChange(false)
        setCurrentTime(0)
        setMultitrackMode(false)
        setOriginalVolume(1)
        setIsLooping(false)
    }

    // Handles play/pause button press
    const togglePlayPause = () => {
        if (originalRef.current) {
            if (isPlaying) {
                originalRef.current.pause()
            } else {
                originalRef.current.play()
            }
        }
        if (otherRef.current) {
            console.log(otherRef.current)
            if (isPlaying) {
                otherRef.current.pause()
            } else {
                otherRef.current.play()
            }
        }
        if (vocalRef.current) {
            if (isPlaying) {
                vocalRef.current.pause()
            } else {
                vocalRef.current.play()
            }
        }
        if (bassRef.current) {
            if (isPlaying) {
                bassRef.current.pause()
            } else {
                bassRef.current.play()
            }
        }
        if (drumRef.current) {
            if (isPlaying) {
                drumRef.current.pause()
            } else {
                drumRef.current.play()
            }
        }
        onIsPlayingChange(!isPlaying)
        setIsPlaying(!isPlaying)
    }

    // Handles stop button press
    const handleStop = () => {
        if (isPlaying) {
            togglePlayPause()
        }
        if (originalRef.current) {
            if (isLooping)
                originalRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            else
                originalRef.current.currentTime = 0
        }
        if (otherRef.current) {
            if (isLooping)
                otherRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            else
                otherRef.current.currentTime = 0
        }
        if (vocalRef.current) {
            if (isLooping)
                vocalRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            else
                vocalRef.current.currentTime = 0
        }
        if (bassRef.current) {
            if (isLooping)
                bassRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            else
                bassRef.current.currentTime = 0
        }
        if (drumRef.current) {
            if (isLooping)
                drumRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            else
                drumRef.current.currentTime = 0
        }
    }

    // Updates time bar while audio plays
    const handleTimeUpdate = () => {
        if (originalRef.current && !isDragging) {
            if (isLooping) {
                if (originalRef.current.currentTime >= (loopEnd / SLIDER_FIDELITY) * duration)
                    originalRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            }
            setCurrentTime(originalRef.current.currentTime)
        }
        if (otherRef.current && !isDragging) {
            if (isLooping) {
                if (otherRef.current.currentTime >= (loopEnd / SLIDER_FIDELITY) * duration)
                    otherRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            }
            setCurrentTime(otherRef.current.currentTime)
        }
        if (vocalRef.current && !isDragging) {
            if (isLooping) {
                if (vocalRef.current.currentTime >= (loopEnd / SLIDER_FIDELITY) * duration)
                    vocalRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            }
            setCurrentTime(vocalRef.current.currentTime)
        }
        if (bassRef.current && !isDragging) {
            if (isLooping) {
                if (bassRef.current.currentTime >= (loopEnd / SLIDER_FIDELITY) * duration)
                    bassRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            }
            setCurrentTime(bassRef.current.currentTime)
        }
        if (drumRef.current && !isDragging) {
            if (isLooping) {
                if (drumRef.current.currentTime >= (loopEnd / SLIDER_FIDELITY) * duration)
                    drumRef.current.currentTime = (loopStart / SLIDER_FIDELITY) * duration
            }
            setCurrentTime(drumRef.current.currentTime)
        }
    }

    // Handles the end of an audio track in the html element,
    // stopping the audio when looping is off and starting 
    // the audio from the loop start when looping is on
    const handleAudioEnded = () => {
        if (isLooping) {
            const loopStartTime = (loopStart / SLIDER_FIDELITY) * duration
            if (originalRef.current) {
                originalRef.current.currentTime = loopStartTime
                originalRef.current.play()
            }
            if (otherRef.current) {
                otherRef.current.currentTime = loopStartTime
                otherRef.current.play()
            }
            if (vocalRef.current) {
                vocalRef.current.currentTime = loopStartTime
                vocalRef.current.play()
            }
            if (bassRef.current) {
                bassRef.current.currentTime = loopStartTime
                bassRef.current.play()
            }
            if (drumRef.current) {
                drumRef.current.currentTime = loopStartTime
                drumRef.current.play()
            }
        }
        else {
            console.log("hit handleAudioEnded -> handleStop()")
            handleStop()
        }
    }

    // Handles time bar being dragged to new position
    const handleBarDrag = (value: number[]) => {
        let newTime = (value[0] / SLIDER_FIDELITY) * duration
        if (isLooping) {
            if (value[0] < loopStart)
                newTime = (loopStart / SLIDER_FIDELITY) * duration
            else if (value[0] > loopEnd)
                newTime = (loopEnd / SLIDER_FIDELITY) * duration

        }
        setCurrentTime(newTime)
        setIsDragging(true)
    }

    // Updates audio time based on time bar drag
    const handleBarRelease = () => {
        if (originalRef.current) {
            originalRef.current.currentTime = currentTime
        }
        if (otherRef.current) {
            otherRef.current.currentTime = currentTime
        }
        if (vocalRef.current) {
            vocalRef.current.currentTime = currentTime
        }
        if (bassRef.current) {
            bassRef.current.currentTime = currentTime
        }
        if (drumRef.current) {
            drumRef.current.currentTime = currentTime
        }
        setIsDragging(false)
    }

    // Handles original track metadata
    const handleLoadedMetadata = () => {
        if (originalRef.current) {
            setDuration(originalRef.current.duration)
        }
    }

    // Changes volume of specific track based on volume bar
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value) / 100

        if (e.target.id === "original") {
            setOriginalVolume(newVolume)
            if (originalRef.current) {
                originalRef.current.volume = newVolume
            }
        }
        if (e.target.id === "other") {
            setOtherVolume(newVolume)
            if (otherRef.current) {
                otherRef.current.volume = newVolume
            }
        }
        if (e.target.id === "vocal") {
            setVocalVolume(newVolume)
            if (vocalRef.current) {
                vocalRef.current.volume = newVolume
            }
        }
        if (e.target.id === "bass") {
            setBassVolume(newVolume)
            if (bassRef.current) {
                bassRef.current.volume = newVolume
            }
        }
        if (e.target.id === "drum") {
            setDrumVolume(newVolume)
            if (drumRef.current) {
                drumRef.current.volume = newVolume
            }
        }
    }


    // Handles looping button press, turning looping mode on/off
    const toggleLooping = () => {
        if (isLooping) {
            setIsLooping(false)
        } else {
            if (originalRef.current) {
                if (originalRef.current.currentTime < (loopStart / SLIDER_FIDELITY) * duration || originalRef.current.currentTime > (loopEnd / SLIDER_FIDELITY) * duration) {
                    const newTime = (loopStart / SLIDER_FIDELITY) * duration
                    originalRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                }
            }
            if (otherRef.current) {
                if (otherRef.current.currentTime < (loopStart / SLIDER_FIDELITY) * duration || otherRef.current.currentTime > (loopEnd / SLIDER_FIDELITY) * duration) {
                    const newTime = (loopStart / SLIDER_FIDELITY) * duration
                    otherRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                }
            }
            if (vocalRef.current) {
                if (vocalRef.current.currentTime < (loopStart / SLIDER_FIDELITY) * duration || vocalRef.current.currentTime > (loopEnd / SLIDER_FIDELITY) * duration) {
                    const newTime = (loopStart / SLIDER_FIDELITY) * duration
                    vocalRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                }
            }
            if (bassRef.current) {
                if (bassRef.current.currentTime < (loopStart / SLIDER_FIDELITY) * duration || bassRef.current.currentTime > (loopEnd / SLIDER_FIDELITY) * duration) {
                    const newTime = (loopStart / SLIDER_FIDELITY) * duration
                    bassRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                }
            }
            if (drumRef.current) {
                if (drumRef.current.currentTime < (loopStart / SLIDER_FIDELITY) * duration || drumRef.current.currentTime > (loopEnd / SLIDER_FIDELITY) * duration) {
                    const newTime = (loopStart / SLIDER_FIDELITY) * duration
                    drumRef.current.currentTime = newTime
                    setCurrentTime(newTime)
                }
            }

            setIsLooping(true)
        }
    }


    // Handles loop bar being dragged, updating the start and end values of the loop
    const handleLoopBarDrag = (value: number[]) => {
        const start = value[0]
        const end = value[1]

        console.log("Start:", start)
        console.log("End:", end)
        setLoopStart(start)
        setLoopEnd(end)

    }



    const smallScreenAudioControls = (id: string, volume: number) => {
        return (
            <div className='flex flex-col grow items-start justify-center border border-black px-2 pt-1 pb-2'>
                <div className='flex w-full gap-1 justify-between items-center mb-1'>
                    <img
                        className='size-3'
                        src={VolumeOnIcon}
                    />
                    <p className='text-sm'>
                        {id}
                    </p>
                </div>
                <input
                    className='accent-tabbi-dark-gray w-full'
                    id={id}
                    type='range'
                    value={volume * 100}
                    max='100'
                    onChange={handleVolumeChange}
                />
            </div>
        )
    }


    return (
        <>
            {/* Original / Multitrack options */}
            <div className='flex items-center justify-start ml-4 -mb-[1px]'>
                <div className='flex gap-4'>
                    <button
                        className={(!multitrackMode ? 'bg-tabbi-tertiary text-tabbi-light-gray border border-black' : 'bg-tabbi-light-gray border border-black text-black hover:bg-tabbi-med-gray') + ' font-bold py-2 px-4 focus:outline-none focus:shadow-outline'}
                        onClick={handleMultitrackOff}
                        disabled={!multitrackMode}
                    >
                        Original
                    </button>
                    <button
                        className={(multitrackMode ? 'bg-tabbi-tertiary text-tabbi-light-gray border border-black' : 'bg-tabbi-light-gray border border-black text-black hover:bg-tabbi-med-gray') + ' font-bold py-2 px-4 focus:outline-none focus:shadow-outline'}
                        onClick={handleMultitrackOn}
                        disabled={multitrackMode}
                    >
                        Multitrack
                    </button>
                </div>
            </div>

            {/* Large player main body */}
            <div className='hidden lg:block pt-6 pl-6 pr-6 pb-4 border border-black mb-4'>
                <div className='flex grow -mr-[6px]'>
                    {/* Play/pause and stop buttons */}
                    <div className='flex gap-2 mb-1 w-[15.8%] items-center'>
                        <button onClick={togglePlayPause}>
                            <img
                                className='w-10 h-10 border border-black'

                                src={isPlaying ? PauseButton : PlayButton}
                            />
                        </button>
                        <button onClick={handleStop}>
                            <img
                                className='w-10 h-10 border border-black'
                                src={StopButton}
                            />
                        </button>
                    </div>

                    {/* Time display and bar */}
                    <div className='flex flex-col w-[84.2%]'>
                        <div className='ml-1'>
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>

                        <Slider.Root
                            className='relative flex h-5 w-full z-10 touch-none select-none items-center'
                            defaultValue={[0]}
                            max={SLIDER_FIDELITY}
                            step={1}
                            onValueChange={handleBarDrag}
                            onPointerUp={handleBarRelease}
                            onTouchEnd={handleBarRelease}
                            value={[(currentTime / duration) * SLIDER_FIDELITY || 0]}
                        >
                            <Slider.Track className='relative h-[5px] grow rounded-full bg-tabbi-dark-gray border border-black'>
                                <Slider.Range className={`absolute h-full rounded-full bg-tabbi-primary `} />
                            </Slider.Track>
                            <Slider.Thumb
                                className={`block size-4 rounded-full border border-black bg-tabbi-primary`}
                            />
                        </Slider.Root>
                    </div>
                </div>

                {/* Audio track rows */}
                <div className='flex flex-col grow mb-2'>
                    {originalSrcRef.current && !multitrackMode &&
                        TrackRow('original', originalRef, original, handleLoadedMetadata, originalVolume, handleVolumeChange,
                            visualizerRef, originalBlob, handleTimeUpdate, handleAudioEnded)}
                    {otherSrcRef.current && multitrackMode &&
                        TrackRow('other', otherRef, other, handleLoadedMetadata, otherVolume, handleVolumeChange,
                            visualizerRef, otherBlob, handleTimeUpdate, handleAudioEnded)}
                    {vocalSrcRef.current && multitrackMode &&
                        TrackRow('vocal', vocalRef, vocals, handleLoadedMetadata, vocalVolume, handleVolumeChange,
                            visualizerRef, vocalBlob, handleTimeUpdate, handleAudioEnded)}
                    {bassSrcRef.current && multitrackMode &&
                        TrackRow('bass', bassRef, bass, handleLoadedMetadata, bassVolume, handleVolumeChange,
                            visualizerRef, bassBlob, handleTimeUpdate, handleAudioEnded)}
                    {drumSrcRef.current && multitrackMode &&
                        TrackRow('drum', drumRef, drums, handleLoadedMetadata, drumVolume, handleVolumeChange,
                            visualizerRef, drumBlob, handleTimeUpdate, handleAudioEnded)}

                </div>

                {/* loop controls */}
                <div className='flex grow -mt-2 -mr-[6px]'>
                    {/* Loop on/off button */}
                    <div className='flex gap-2 mb-1 w-[15.8%] items-center'>
                        <button
                            className={`h-10 w-10 border border-black text-[14px] ${isLooping ? 'bg-tabbi-secondary' : 'bg-tabbi-light-gray'}`}
                            onClick={toggleLooping}>
                            loop
                        </button>

                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button className='inline-flex items-center justify-center rounded-full border-tabbi-med-gray border-2 w-5 h-5 text-tabbi-med-gray text-[.9em]'>?</button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className='select-none bg-tabbi-light-gray border border-black drop-shadow-lg p-4 w-80 z-[100] transition-all duration-[.25s]'
                                        side='right'
                                        sideOffset={5}
                                    >
                                        Audio looping allows you to automatically relplay a selection of the song you're trying to learn on a loop.
                                        <br />
                                        <br />
                                        The sliders to the right are used to set the start and end time of the loop, but they are only adjustable when audio is paused.
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>

                    </div>

                    {/* Looper bar */}
                    <div className='flex flex-col w-[84.2%]'>

                        <Slider.Root
                            className='relative flex h-5 w-full z-10 touch-none select-none items-center'
                            defaultValue={[0, SLIDER_FIDELITY]}
                            max={SLIDER_FIDELITY}
                            step={1}
                            disabled={isLooping}

                            minStepsBetweenThumbs={SLIDER_FIDELITY / 100}

                            onValueChange={handleLoopBarDrag}
                        >
                            <Slider.Track className='relative h-[5px] grow rounded-full bg-black border border-black'>
                                <Slider.Range className={`absolute h-full rounded-full ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'} `} />
                            </Slider.Track>
                            <Slider.Thumb
                                className={`block size-4 rounded-full border border-black ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'}`}
                            />
                            <Slider.Thumb
                                className={`block size-4 rounded-full border border-black ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'}`}
                            />
                        </Slider.Root>
                    </div>
                </div>
            </div>

            {/* Small player main body */}
            <div className='flex flex-col gap-5 lg:hidden p-6 border border-black mb-4'>
                {/* buttons and time*/}
                <div className='flex w-full justify-between'>
                    <div className='flex gap-2 items-center'>
                        <button onClick={togglePlayPause}>
                            <img
                                className='w-10 h-10 border border-black'

                                src={isPlaying ? PauseButton : PlayButton}
                            />
                        </button>
                        <button onClick={handleStop}>
                            <img
                                className='w-10 h-10 border border-black'
                                src={StopButton}
                            />
                        </button>
                        <div className='ml-1'>
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <button
                            className={`h-10 w-10 border border-black text-[14px] ${isLooping ? 'bg-tabbi-secondary' : 'bg-tabbi-light-gray'}`}
                            onClick={toggleLooping}>
                            loop
                        </button>

                    </div>
                </div>

                {/* time slider */}
                <Slider.Root
                    className='relative flex w-full z-10 mb-1 touch-none select-none items-center'
                    defaultValue={[0]}
                    max={SLIDER_FIDELITY}
                    step={1}
                    onValueChange={handleBarDrag}
                    onPointerUp={handleBarRelease}
                    onTouchEnd={handleBarRelease}
                    value={[(currentTime / duration) * SLIDER_FIDELITY || 0]}
                >
                    <Slider.Track className='relative h-[5px] grow rounded-full bg-tabbi-dark-gray border border-black'>
                        <Slider.Range className={`absolute h-full rounded-full bg-tabbi-primary `} />
                    </Slider.Track>
                    <Slider.Thumb
                        className={`block size-4 rounded-full border border-black bg-tabbi-primary`}
                    />
                </Slider.Root>

                {/* loop slider */}
                <Slider.Root
                    className='relative flex w-full z-10 touch-none select-none items-center'
                    defaultValue={[0, SLIDER_FIDELITY]}
                    max={SLIDER_FIDELITY}
                    step={1}
                    disabled={isLooping}

                    minStepsBetweenThumbs={SLIDER_FIDELITY / 100}

                    onValueChange={handleLoopBarDrag}
                >
                    <Slider.Track className='relative h-[5px] grow rounded-full bg-black border border-black'>
                        <Slider.Range className={`absolute h-full rounded-full ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'} `} />
                    </Slider.Track>
                    <Slider.Thumb
                        className={`block size-4 rounded-full border border-black ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'}`}
                    />
                    <Slider.Thumb
                        className={`block size-4 rounded-full border border-black ${isLooping ? 'bg-tabbi-secondary' : 'bg-white'}`}
                    />
                </Slider.Root>

                {/* audio controls */}
                <div className='flex justify-start gap-2'>
                    {originalSrcRef.current && !multitrackMode &&
                        (<>
                            {smallScreenAudioControls('original', originalVolume)}
                            <div className='grow' />
                        </>)}

                    {otherSrcRef.current && multitrackMode && smallScreenAudioControls('other', otherVolume)}
                    {vocalSrcRef.current && multitrackMode && smallScreenAudioControls('vocal', vocalVolume)}
                    {bassSrcRef.current && multitrackMode && smallScreenAudioControls('bass', bassVolume)}
                    {drumSrcRef.current && multitrackMode && smallScreenAudioControls('drum', drumVolume)}

                </div>
            </div>
        </>

    )
})


const TrackRow = (id: string, audioRef: React.MutableRefObject<HTMLAudioElement | null>, src: string, handleLoadedMetadata: () => void,
    volume: number, handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    visualizerRef: React.RefObject<HTMLCanvasElement | null>, blob: Blob | null | undefined, handleTimeUpdate: () => void, handleAudioEnded: () => void) => {
    return (
        <div className='flex mb-1'>
            {/* Audio element */}
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
            />

            {/* Track title and volume */}
            <div className='flex flex-col w-1/6 items-end justify-center border border-black px-2'>
                <p className='text-lg'>
                    {id}
                </p>
                <div className='flex gap-2 items-center'>
                    <img
                        className='size-6'
                        src={VolumeOnIcon}
                    />
                    <input
                        className='accent-tabbi-dark-gray'
                        id={id}
                        type='range'
                        value={volume * 100}
                        max='100'
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>

            {/* Track audio visualization */}
            <div className='flex flex-col md:w-5/6 -ml-[1px] border border-black'>
                {blob &&
                    <>
                        <AudioVisualizer
                            ref={visualizerRef}
                            blob={blob}
                            width={900}
                            height={70}
                            barWidth={1}
                            gap={0}
                            barColor={'#222222'}
                            backgroundColor={'#cccccc'}
                        />
                    </>
                }
            </div>
        </div>
    )
}

// Helper method to format time for time display
const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default AudioPlayer