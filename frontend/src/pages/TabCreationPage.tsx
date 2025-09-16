import { type FormEvent, useState } from 'react'
import AudioUploadForm from '../components/AudioUploadForm'
import AudioRecordForm from '../components/AudioRecordForm'
import TabLiveTranscriptionInterface from '../components/TabLiveTranscriptionInterface'

const TabFileUploadPage = () => {

  // const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [recordingMode, setRecordingMode] = useState<number>(0)

  // Form
  const [title, setTitle] = useState<string>('')
  const [artist, setArtist] = useState<string>('')
  const [publicState, setPublicState] = useState<boolean>(false)
  const [file, setFile] = useState<File>()

  // Submits form data to api
  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const toggleRecordingMode = (mode: number) => {
    setFile(undefined)
    setRecordingMode(mode)

  }

  return (
    <>
      <p className='text-5xl font-semibold m-8'>
        New Tab
      </p>
        <>
          {/* Uploaded / Saved Tab Bar */}
          <div className='flex items-start gap-8 w-full px-8'>
            <button
              className={`${recordingMode === 0 ? 'bg-tabbi-tertiary text-tabbi-light-gray' : 'bg-tabbi-light-gray text-black hover:bg-tabbi-med-gray'} font-bold py-2 px-4 focus:outline-none focus:shadow-outline border border-black -m-[1px]`}
              onClick={() => { toggleRecordingMode(0) }}
              disabled={recordingMode === 0}
            >
              Upload File
            </button>
            <button
              className={`${recordingMode === 1 ? 'bg-tabbi-tertiary text-tabbi-light-gray' : 'bg-tabbi-light-gray text-black hover:bg-tabbi-med-gray'} font-bold py-2 px-4 focus:outline-none focus:shadow-outline border border-black -m-[1px]`}
              onClick={() => { toggleRecordingMode(1) }}
              disabled={recordingMode === 1}
            >
              Record Audio
            </button>
            <button
              className={`${recordingMode === 2 ? 'bg-tabbi-tertiary text-tabbi-light-gray' : 'bg-tabbi-light-gray text-black hover:bg-tabbi-med-gray'} font-bold py-2 px-4 focus:outline-none focus:shadow-outline border border-black -m-[1px]`}
              onClick={() => { toggleRecordingMode(2) }}
              disabled={recordingMode === 2}
            >
              Live Transcription
            </button>
          </div>
          <hr className="border-black mb-8" />

          {recordingMode === 1
            ?
            <AudioRecordForm
              title={title}
              setTitle={setTitle}
              artist={artist}
              setArtist={setArtist}
              publicState={publicState}
              setPublicState={setPublicState}
              file={file}
              setFile={setFile}
              submitForm={submitForm}
            />
            : recordingMode === 0 ?
              <AudioUploadForm
                title={title}
                setTitle={setTitle}
                artist={artist}
                setArtist={setArtist}
                publicState={publicState}
                setPublicState={setPublicState}
                file={file}
                setFile={setFile}
                submitForm={submitForm}
              />
              :
              <TabLiveTranscriptionInterface />
          }
        </>
    </>
  )
}

export default TabFileUploadPage