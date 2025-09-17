import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { motion } from "motion/react"
import dial from "../assets/images/Dial.svg"
import { RadioGroup, Switch } from "radix-ui";
import { PitchDetector } from 'pitchy'

const Tuner = () => {
    // Tuner animation
    const [rotate, setRotate] = useState(-85)

    // Audio streaming
    const isRecording = useRef<boolean>(false)
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

    // Tuner options
    const [tuningString, setTuningString] = useState<number>(0)
    const tuningFreqRef = useRef<number>(82.42)
    const tuningNotes: string[] = [' E ', ' A ', ' D ', ' G ', ' B ', ' e ']
    const tuningFreqs: number[] = [82.42, 110.00, 146.83, 196.00, 246.94, 329.63]
    const [cents, setCents] = useState<number | null>(null)

    useEffect(() => {
        return () => {
            isRecording.current = false
        }
    }, [])

    // Stop media stream tracks when navigating away from page
    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop())
                setMediaStream(null)
                console.log("media stream stopped")
            }
        }
    }, [mediaStream])

    // Update tuningFreqRef when tuningString is changed
    useEffect(() => {
        tuningFreqRef.current = tuningFreqs[+tuningString]
    }, [tuningString])

    // Start/stop recording after recording switch is clicked
    const toggleRecording = async () => {
        if (isRecording.current) {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop())
                setMediaStream(null)
            }

            isRecording.current = false
            setCents(null)
            setRotate(-85)

        } else {
            // Start recording
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            setMediaStream(stream)

            const audioContext = new window.AudioContext()
            const analyserNode = audioContext.createAnalyser()

            audioContext.createMediaStreamSource(stream).connect(analyserNode)
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize)
            detector.minVolumeDecibels = -20
            const input = new Float32Array(detector.inputLength)
            isRecording.current = true
            updatePitch(analyserNode, detector, input, audioContext.sampleRate)
        }
    }

    const updatePitch = (analyserNode: AnalyserNode, detector: PitchDetector<Float32Array>, input: any, sampleRate: number) => {
        analyserNode.getFloatTimeDomainData(input)
        const [pitch, clarity] = detector.findPitch(input, sampleRate)

        console.log(pitch)
        console.log("pitch updated")

        if (pitch > 0) {
            const incomingCents: number = 1200 * Math.log2(pitch / tuningFreqRef.current)
            const clampedCents: number = Math.min(Math.max(incomingCents, -85), 85)
            setRotate(clampedCents)
            setCents(incomingCents)
        } else {
            setRotate(-85)
            setCents(0)
        }

        if (isRecording.current) {
            window.setTimeout(
                () => updatePitch(analyserNode, detector, input, sampleRate),
                100,
            )
        } else {
            setRotate(-85)
            setCents(0)
        }

    }

    const handleValueChange = (value: string) => {
        setTuningString(+value)
    }

    return (
        <>
            <div className='flex flex-col md:flex-row justify-center items-center md:gap-16 md:mt-8'>

                {/* Start/stop switch and tuner dial (left side) */}
                    <div className='flex flex-col justify-center items-center -mt-4'>

                        {OnOffSwitch(toggleRecording)}

                        {TunerDialAndScreen(rotate, cents)}

                    </div>

                {/* String and note choice (Right side)*/}
                <div className='w-[300px] -mt-4 md:mt-0 md:mb-12 z-20'>
                    <div className='flex flex-col items-center'>
                        <div className='flex h-[150px] w-[200px] md:h-[180px] md:w-[300px] bg-tabbi-dark-gray justify-center items-center'>
                            <p className='text-[150px] font-bold text-tabbi-secondary font-gridlite whitespace-pre'>
                                {tuningNotes[tuningString]}
                            </p>
                        </div>

                        {/* Radio buttons, lines, and labels */}
                        <RadioGroup.Root
                            className='flex px-[12px] gap-[16px] justify-between'
                            defaultValue='0'
                            onValueChange={handleValueChange}
                        >
                            {RadioNoteSelector('0', 'r0', 'E')}
                            {RadioNoteSelector('1', 'r1', 'A')}
                            {RadioNoteSelector('2', 'r2', 'D')}
                            {RadioNoteSelector('3', 'r3', 'G')}
                            {RadioNoteSelector('4', 'r4', 'B')}
                            {RadioNoteSelector('5', 'r5', 'e')}
                        </RadioGroup.Root>
                    </div>
                </div>
            </div>
        </>
    )
}

const OnOffSwitch = (toggleRecording: () => Promise<void>) => {
    return (
        <>
            <div className='flex space-x-4 -ml-[10px] mb-3 items-center'>
                <label htmlFor='tuner-switch'>off</label>

                <Switch.Root
                    className='relative h-[30px] w-[48px] cursor-default rounded-full bg-gradient-to-r from-tabbi-secondary from-50% to-tabbi-primary to-50% border-2 border-tabbi-dark-gray'
                    id='tuner-switch'
                    onClick={toggleRecording}
                >
                    <Switch.Thumb
                        className='block justify-around -mt-[5px] -ml-[6px] items-center size-[36px] bg-tabbi-dark-gray rounded-full transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[21px]'
                    />

                </Switch.Root>

                <label htmlFor='tuner-switch'>on</label>
            </div>
        </>
    )
}


const TunerDialAndScreen = (rotate: number, cents: number | null) => {
    return (
        <>
            <p className={rotate > -3 && rotate < 3 ? 'text-4xl font-bold text-green-500' : 'text-4xl font-bold text-red-500'} >v</p>
            <div className='relative size-50 md:size-96 z-0 overflow-hidden'>
                <motion.img
                    className="w-full h-full"
                    src={dial}
                    animate={{ rotate }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut'
                    }}
                />
                <div className='absolute inset-0 flex justify-center items-end z-10'>
                    <div className='flex flex-col items-center bg-tabbi-light-gray w-full h-1/2 justify-start'>
                        <h1 className='flex justify-end items-center w-full h-15 md:h-20 md:mt-4 p-4 bg-tabbi-dark-gray text-[40px] md:text-[72px] font-bold text-tabbi-secondary font-gridlite'>
                            {!cents ? '' : cents > 0 ? '+' + cents.toFixed(1) :
                                cents.toFixed(1)}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}


const RadioNoteSelector = (value: string, id: string, note: string) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-[2px] md:w-[2px] h-10 md:h-12 bg-tabbi-dark-gray'> </div>
            <RadioGroup.Item
                className='size-[22px] md:size-[32px] border-2 border-tabbi-dark-gray rounded-full'
                value={value}
                id={id}
            >
                <RadioGroup.Indicator className='relative flex size-full items-center justify-center after:block after:size-[15px] md:after:size-[18px] after:rounded-full after:bg-tabbi-primary transition-all duration-[.2s]' />
            </RadioGroup.Item>
            <label
                className='text-xl'
                htmlFor={id}
            >
                {note}
            </label>
        </div>
    )
}

export default Tuner
