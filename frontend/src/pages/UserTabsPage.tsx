import UserTabsBody from '../components/UserTabsBody'
import { type Metadata, type Upload } from '../utilities/Types'
import PageTitle from '../components/PageTitle'

const UserTabsPage = () => {

    const uploadedList: Metadata[] = [
        { artist: "Water From Your Eyes", public: 0, title: "Life Signs", id: '0' },
        { artist: "Radiohead", public: 0, title: "Weird Fishes / Arpeggi", id: '3' },
        { artist: "Panda Bear", public: 1, title: "Anywhere but Here", id: '7' },
        { artist: "MJ Lenderman", public: 0, title: "Hangover Game", id: '8' }
    ]
    const savedList: Upload[] = [
        { artist: "Water From Your Eyes", public: false, popularity: 5, title: "Life Signs", uploader: 2, id: '0', username: 'josh' },
        { artist: "Parquet Courts", public: true, popularity: 4, title: "Wide Awake", uploader: 3, id: '1', username: 'katie' },
        { artist: "Wilco", public: true, popularity: 3, title: "Pot Kettle Black", uploader: 4, id: '2', username: 'josh' },
        { artist: "Radiohead", public: false, popularity: 2, title: "Weird Fishes / Arpeggi", uploader: 5, id: '3', username: 'tim' },
        { artist: "Alex G", public: true, popularity: 1, title: "Miracles", uploader: 6, id: '4', username: 'amanda' }
    ]

    return (
        <>
            <PageTitle>
                My Tabs
            </PageTitle>
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