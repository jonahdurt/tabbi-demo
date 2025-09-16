import UserTabsBody from '../components/UserTabsBody'
import { type Metadata, type Upload } from '../utilities/Types'

const UserTabsPage = () => {

    const uploadedList: Metadata[] = [
        { artist: "artist1", public: 0, title: "hello", id: '0' },
        { artist: "artist4", public: 0, title: "how", id: '6' },
        { artist: "artist5", public: 0, title: "are", id: '7' },
        { artist: "artist6", public: 0, title: "you", id: '8' }
    ]
    const savedList: Upload[] = [
        { artist: "artist1", public: true, popularity: 5, title: "hello", uploader: 2, id: '0', username: 'josh' },
        { artist: "artist2", public: true, popularity: 4, title: "world", uploader: 3, id: '1', username: 'katie' },
        { artist: "artist3", public: true, popularity: 3, title: "nice", uploader: 4, id: '2', username: 'josh' },
        { artist: "artist4", public: true, popularity: 2, title: "to meet", uploader: 5, id: '3', username: 'tim' },
        { artist: "artist5", public: true, popularity: 1, title: "you", uploader: 6, id: '4', username: 'amanda' }
    ]

    const loggedIn: boolean = true

    return (
        <>
            <div className='mt-8 mb-10 mx-8 flex justify-between'>
                <h1 className='text-5xl font-semibold'>
                    My Tabs
                </h1>
                {/* <div>
                    <AudioUploadDialog
                        fetchUploaded={() => { }}
                        disabled={!loggedIn}
                    />
                </div> */}
            </div>
            <div>
                <div className=''>
                    <UserTabsBody
                        uploadedList={uploadedList}
                        savedList={savedList}
                        fetchUploaded={() => { }}
                        fetchSaved={() => { }}
                    />
                </div>
            </div>
        </>
    )
}

export default UserTabsPage