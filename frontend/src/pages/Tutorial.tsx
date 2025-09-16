import Upload from '../assets/images/createTabs.png'
import Tuner from '../assets/images/tuner.png'
import Listen from '../assets/images/audioPlayer.png'
import Record from '../assets/images/recordAudio.png'
import Transcribe from '../assets/images/liveTranscription.png'

const Tutorial = () => {

    return (
        <div className='flex flex-col'>

            <h1 className='text-5xl font-semibold'>
                How to Use Tabbi
            </h1>

            <h2 className='text-3xl font-semibold mt-8 mb-4'>
                Tuning
            </h2>
            <div className='flex justify-between align-top gap-8'>
                <div className=''>
                    <p className='mb-8 text-xl leading-relaxed text-justify'>
                        To use the tuner, first click the "on/off" switch to "on" and enable the browser to access your
                        microphone. Once the tuner is active,
                        select the string you are tuning from the radio buttons under the pitch display. Plucking the
                        string will cause the tuner to report how close to
                        the correct pitch your string is. Differences are measured in musical "cents". When a string is
                        in tune, the v indicator above the dial will turn green.
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-[300px] lg:w-[800px] object-contain border border-black'
                            src={Tuner}
                            alt='tuner'
                        />
                    </p>
                </div>
            </div>


            <h2 className='text-3xl font-semibold mt-12 mb-4'>
                Creating Tabs
            </h2>
            <p className="text-xl text-justify">There are 3 ways to generate tabs in Tabbi. To get started, click the "Create Tabs" button in the header.</p>

            <div className='flex justify-between align-top gap-8'>

                <div className=''>
                    <p className='mt-8 mb-8 text-xl leading-relaxed text-justify'>

                        <h2 className='text-3m font-semibold mt-6'>
                            File Upload
                        </h2>
                        In the "Upload File" tab, enter some meta data about your upload, select a file and mark the upload as "Public" if you would like it to be visible by other users on the site.
                        When ready, hit "Create Tab" to begin processing the audio and your tabs should be ready shortly.
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-[300px] lg:w-[800px] object-contain border border-black'
                            src={Upload}
                            alt='Create Tabs'
                        />
                    </p>
                </div>
            </div>

            <div className='flex justify-between align-top gap-8'>
                <div className=''>
                    <p className='mt-12 mb-8 text-xl leading-relaxed text-justify'>
                        <h2 className='text-3m font-semibold mt-6'>
                            Record Audio
                        </h2>
                        Another option is to record audio directly to the site. Hit the "Record" button to start recording. Play the audio you would like to generate tabs for into your input device. When done, hit "Stop".
                        If you would like to generate tabs, complete the upload as you would a regular file upload. When you are done recording, a "Download MP3" button will appear that allows you to download the audio you have recorded.
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-[300px] lg:w-[800px] object-contain border border-black'
                            src={Record}
                            alt='Audio Player'
                        />
                    </p>
                </div>
            </div>

            <div className='flex justify-between align-top gap-8'>

                <div className=''>
                    <p className='mt-12 mb-8 text-xl leading-relaxed text-justify'>
                        <h2 className='text-3m font-semibold mt-6'>
                            Live Transcription
                        </h2>
                        Finally, Live Transcription allows you to stream audio directly to the tab generation code and get tabs out in real time! It is important to minimize outside noise from your recording to generate the best results.
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-[300px] lg:w-[800px] object-contain border border-black'
                            src={Transcribe}
                            alt='Audio Player'
                        />
                    </p>
                </div>
            </div>

            <h2 className='text-3xl font-semibold mt-12 mb-4'>
                Audio Playback
            </h2>
            <div className='flex justify-between align-top gap-8 text-justify'>

                <div className=''>

                    <p className='mb-8 text-xl leading-relaxed'>
                        Since Tabbi is able to separate tracks of individual instruments from mixed audio, the audio
                        player on the page for a specific tab allows you to mix the split tracks
                        for a piece of audio individually. To access this feature, hti the "Multitrack" tab on the audio
                        player. Each of the identified tracks can then have their volume changed individually.
                    </p>
                    <p className='flex justify-center'>
                        <img
                            className='w-[300px] lg:w-[800px] object-contain border border-black'
                            src={Listen}
                            alt='Audio Player'
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Tutorial