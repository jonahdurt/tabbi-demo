import { useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
// import 'react-h5-audio-player/lib/styles.css'
import AudioPlayer from './AudioPlayer'
import { AlertDialog } from 'radix-ui'

interface Tabs {
    [key: string]: number[][];
}

interface AudioPlayerHandle {
    getCurrentTime: () => number | undefined;
}

const TabView = () => {

    // Constants
    const HIGHLIGHT_UPDATE_FREQUENCY = 100

    // Reference to audio player element
    const audioPlayerRef = useRef<AudioPlayerHandle>(null)

    // URL params
    const params = useParams()

    const myTabs: Tabs = {
        '2.022': [[4, 8]],
        '2.530': [[4, 6]],
        '3.026': [[3, 3]],
        '3.157': [[3, 4]],
        '3.402': [[3, 5]],
        '3.762': [[2, 5]],
        '4.266': [[3, 3]],
        '4.653': [[2, 3]],
        '4.992': [[4, 6]],
        '5.129': [[4, 5]],
        '5.371': [[4, 3]],
        '5.593': [[3, 3]],

        '5.974': [[5, 5]],
        '6.427': [[4, 8]],
        '6.905': [[4, 6]],
        '7.076': [[4, 7]],
        '7.315': [[4, 8]],
        '7.688': [[2, 8]],
        '8.188': [[4, 6]],
        '8.559': [[3, 7]],
        '8.885': [[4, 10]],
        '9.051': [[4, 8]],
        '9.303': [[4, 6]],
        '9.552': [[4, 7]],

        '9.903': [[4, 8]],
        '10.361': [[4, 6]],
        '10.846': [[3, 3]],
        '11.017': [[3, 4]],
        '11.241': [[3, 5]],
        '11.608': [[2, 5]],
        '12.115': [[3, 3]],
        '12.496': [[2, 3]],
        '12.808': [[4, 6]],
        '12.994': [[4, 5]],
        '13.241': [[4, 3]],
        '13.478': [[3, 3]],

        '13.825': [[5, 5]],
        '14.301': [[4, 8]],
        '14.783': [[4, 6]],
        '14.964': [[4, 7]],
        '15.191': [[4, 8]],
        '15.547': [[2, 8]],
        '16.034': [[4, 6]],
        '16.430': [[3, 7]],
        '16.738': [[4, 10]],
        '16.925': [[4, 8]],
        '17.160': [[4, 6]],
        '17.407': [[4, 7]],
    }

    // Metadata
    const artist = 'Parquet Courts'
    const title = 'Wide Awake'
    const publicStatus = true

    // Used to check whether this tab belongs to current viewer
    const [uploadIds, setUploadIds] = useState<string[]>([])

    // Audio sources for original and split tracks
    const [originalSrc, setOriginalSrc] = useState<string | null>(null)
    const [otherSrc, setOtherSrc] = useState<string | null>(null)
    const [vocalSrc, setVocalSrc] = useState<string | null>(null)
    const [bassSrc, setBassSrc] = useState<string | null>(null)
    const [drumSrc, setDrumSrc] = useState<string | null>(null)

    // For displaying tab
    const [tabStrings, setTabStrings] = useState<string[]>(['E', 'A', 'D', 'G', 'B', 'e'])
    const tabStringLength = 40
    const [formattedTab, setFormattedTab] = useState<string>('')
    const timeInterval: number = 0.15

    // For tab highlighting
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const intervalRef = useRef<number | null>(null)
    const [tabIndices, setTabIndices] = useState<number[]>([0, 0, 0, 0, 0, 0])

    useEffect(() => {
        getTabFromJson(myTabs)
    }, [])

    const getTabFromJson = (tabs: Tabs) => {
        const keys: string[] = Object.keys(tabs)
        const lastTime: number = +keys[keys.length - 1]

        let noteCount: number = 0 // Tracks number of notes seen so far

        // Look for played notes at every time interval
        for (let time = 0; time < lastTime + 1; time = time + timeInterval) {
            if (noteCount < keys.length) {

                const noteTime = keys[noteCount]
                const notes: number[][] = tabs[noteTime]

                if (+noteTime >= time - (timeInterval * .5) && +noteTime < time + (timeInterval * .5)) {
                    // If the current note is near the current time,
                    // add that note to the tab strings
                    notes.forEach(note => {
                        const string: number = note[0]
                        const fret: number = note[1]
                        tabStrings[string] = tabStrings[string] + fret
                    })

                    // Increase note counter for each note time hit
                    noteCount++
                }
            }

            // Fill in tab strings where no notes are played with dashes
            for (let i = 0; i < tabStrings.length; i++) {
                if (tabStrings[i].length < Math.round(time / timeInterval) + 1) {
                    tabStrings[i] = tabStrings[i] + '-'
                }
            }
        }

        for (let i = 0; i < tabStrings.length; i++) {
            while (tabStrings[i].length % (tabStringLength) !== 0) {
                tabStrings[i] = tabStrings[i] + '-'
            }
        }

        // Refresh screen using state
        setTabStrings(tabStrings)
        formatTabString(tabStrings)
    }

    const formatTabString = (tabStrings: string[]) => {
        const tabs: string[] = tabStrings
        tabs.reverse() // displays tabs in correct order

        let formattedString: string = ''

        for (let i = 0; i < tabStrings[0].length; i = i + tabStringLength) {

            tabs.forEach(tab => {
                formattedString = formattedString + tab.substring(i, i + tabStringLength) + '\n'
            })

            if (i + tabStringLength < tabStrings[0].length) {
                formattedString = formattedString + '\n\n\n'
            }
        }
        setFormattedTab(formattedString)
    }

    const handleIsPlayingChange = (playing: boolean) => {
        setIsPlaying(playing)

        if (playing) {
            startTabHighlighting()
        }
        else {
            stopTabHighlighting()
        }

    }

    const startTabHighlighting = () => {
        console.log("started highlighting")

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
        }

        intervalRef.current = window.setInterval(() => {
            if (audioPlayerRef.current) {
                const timeInSeconds: number | unknown = getAudioPlayerCurrentTime()
                console.log(timeInSeconds)

                if (typeof timeInSeconds === 'number') {
                    const tabIndex: number = Math.floor(timeInSeconds / timeInterval)
                    spliceTab(tabIndex)
                }
            }
        }, HIGHLIGHT_UPDATE_FREQUENCY)
    }

    const stopTabHighlighting = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const getAudioPlayerCurrentTime = () => {
        if (audioPlayerRef.current) {
            const time = audioPlayerRef.current.getCurrentTime()
            return time
        }
    }

    const spliceTab = (tabIndex: number): void => {

        const height = Math.floor(tabIndex / tabStringLength)
        const blockSize = ((tabStringLength + 1) * 6) + 2
        const totalIndex = height * blockSize + (tabIndex % tabStringLength) + (2 * height)
        const indices = [0, 0, 0, 0, 0, 0]

        indices[0] = totalIndex
        indices[1] = totalIndex + tabStringLength + 1
        indices[2] = totalIndex + (tabStringLength + 1) * 2
        indices[3] = totalIndex + (tabStringLength + 1) * 3
        indices[4] = totalIndex + (tabStringLength + 1) * 4
        indices[5] = totalIndex + (tabStringLength + 1) * 5

        setTabIndices(indices)
    }
    return (
        <div className='w-full flex flex-col'>
            <div className=''>
                {/* Tab details */}
                <div className='flex w-full justify-between items-end mt-10 mb-4'>
                    <div>
                        <div className='flex space-x-2 mb-2 text-3xl'>
                            <p className=' font-bold text-tabbi-primary'>Title:</p>
                            <p className=''>{title}</p>
                        </div>
                        <div className='flex space-x-2 text-xl'>
                            <div className='font-bold text-tabbi-primary'>Artist:</div>
                            <div className=''>{artist}</div>
                        </div>
                    </div>

                    {/* Public/private checkbox */}
                    {params.id && uploadIds.includes(params.id) &&
                        <div className='flex space-x-2 mt-5 text-xl'>
                            <div className='font-bold text-tabbi-primary'>Public:</div>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger asChild>
                                    <Checkbox.Root
                                        className='flex size-[25px] appearance-none border border-black items-center justify-center'
                                        checked={publicStatus}
                                    >
                                        <Checkbox.Indicator>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                </AlertDialog.Trigger>
                                <AlertDialog.Portal>
                                    <AlertDialog.Overlay className='fixed inset-0 bg-black opacity-50 data-[state=open]:animate-overlayShow z-[100]' />
                                    <AlertDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 bg-tabbi-light-gray border border-black p-8 z-[100]'>
                                        <AlertDialog.Title className='font-bold text-lg mb-4'>
                                            {publicStatus ?
                                                `Change to private?`
                                                :
                                                'Change to public?'
                                            }                                    </AlertDialog.Title>
                                        <AlertDialog.Description className='mb-6'>
                                            {publicStatus ?
                                                `Setting this song to private means other users will no longer be able to access it, and it will be removed from other user's saved lists.`
                                                :
                                                'Setting this song to public will allow all other users on the site to access it, find it in searches, and add it to their saved list.'
                                            }
                                        </AlertDialog.Description>
                                        <div className='flex justify-end gap-4'>
                                            <AlertDialog.Cancel asChild>
                                                <button className='py-2 px-4 border border-black hover:bg-tabbi-med-gray hover:text-white transition-all duration-[.25s]'>
                                                    Nevermind
                                                </button>
                                            </AlertDialog.Cancel>
                                            <AlertDialog.Action asChild>
                                                <button
                                                    className='py-2 px-4 border border-black bg-tabbi-tertiary text-white hover:bg-tabbi-dark-gray transition-all duration-[.25s]'
                                                    onClick={() => { }}>
                                                    {publicStatus
                                                        ?
                                                        'Yes, make it private'
                                                        :
                                                        'Yes, make it public'
                                                    }
                                                </button>
                                            </AlertDialog.Action>
                                        </div>
                                    </AlertDialog.Content>

                                </AlertDialog.Portal>
                            </AlertDialog.Root>
                        </div>
                    }
                </div>

                {/* Custom audio player */}
                <AudioPlayer
                    originalSrc={originalSrc}
                    otherSrc={otherSrc}
                    vocalSrc={vocalSrc}
                    bassSrc={bassSrc}
                    drumSrc={drumSrc}
                    onIsPlayingChange={handleIsPlayingChange}
                    ref={audioPlayerRef}
                />
            </div>

            {/* Displayed tab */}
            <div className='flex justify-center h-auto whitespace-pre text-[.8rem] sm:text-lg md:text-xl lg:text-2xl tracking-widest'>
                <div className='px-2 py-2 sm:px-4 sm:py-6 md:px-12 md:py-8 lg:px-16 lg:py-12 border border-black bg-white'>
                    {isPlaying
                        ?
                        <>
                            {formattedTab.substring(0, tabIndices[0])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[0], tabIndices[0] + 1)}</span>
                            {formattedTab.substring(tabIndices[0] + 1, tabIndices[1])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[1], tabIndices[1] + 1)}</span>
                            {formattedTab.substring(tabIndices[1] + 1, tabIndices[2])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[2], tabIndices[2] + 1)}</span>
                            {formattedTab.substring(tabIndices[2] + 1, tabIndices[3])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[3], tabIndices[3] + 1)}</span>
                            {formattedTab.substring(tabIndices[3] + 1, tabIndices[4])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[4], tabIndices[4] + 1)}</span>
                            {formattedTab.substring(tabIndices[4] + 1, tabIndices[5])}
                            <span className='bg-blue-300'>{formattedTab.substring(tabIndices[5], tabIndices[5] + 1)}</span>
                            {formattedTab.substring(tabIndices[5] + 1)}
                        </>
                        :
                        formattedTab}
                </div>
            </div>
        </div>
    )
}

export default TabView