import PageTitle from "../components/PageTitle";
import { type Upload } from "../utilities/Types";
import { Link } from "react-router-dom";

const HomePage = () => {
    const popularList: Upload[] = [
        { artist: "Parquet Courts", public: true, popularity: 5, title: "Wide Awake", uploader: 2, id: '0', username: 'josh' },
        { artist: "Big Thief", public: true, popularity: 4, title: "Simulation Swarm", uploader: 3, id: '1', username: 'katie' },
        { artist: "Pavement", public: true, popularity: 3, title: "Zurich is Stained", uploader: 4, id: '2', username: 'josh' },
        { artist: "The Beatles", public: true, popularity: 2, title: "Blackbird", uploader: 5, id: '3', username: 'tim' },
        { artist: "Alex G", public: true, popularity: 1, title: "Miracles", uploader: 6, id: '4', username: 'amanda' }
    ]
    const recentList: Upload[] = [
        { artist: "Big Star", public: true, popularity: 5, title: "Thirteen", uploader: 2, id: '0', username: 'greg' },
        { artist: "Unknown Mortal Orchestra", public: true, popularity: 4, title: "American Guilt", uploader: 3, id: '1', username: 'rufus' },
        { artist: "Geese", public: true, popularity: 3, title: "I See Myself", uploader: 4, id: '2', username: 'sammy' },
        { artist: "HOMESHAKE", public: true, popularity: 2, title: "Every Single Thing", uploader: 5, id: '3', username: 'alexis' },
        { artist: "Wilco", public: true, popularity: 1, title: "Pot Kettle Black", uploader: 6, id: '4', username: 'greg' }
    ]

    return (
        <>
            <div className='flex flex-col md:flex-row w-full justify-between mt-6 gap-8 md:gap-0'>
                <div className='flex flex-col md:w-2/5 md:pr-10 -mt-6'>
                    <div className='-mb-3 md:-ml-6'>
                        <PageTitle>
                            Welcome to Tabbi!
                        </PageTitle>
                    </div>
                    <p className='text-md md:text-xl'>
                        Hi, I'm Jonah. This is a limited demo of a guitar-learning app that I helped build for my capstone project.
                        The original site was taken offline due to backend server costs, so I built this frontend-only version to show off my personal contributions.
                        <br />
                        <br />
                        The full Tabbi site included automatic guitar tab generation, user accounts, a searchable library of user-uploaded content, and more. 
                        You'll still find all of the original pages here, but some interactivity is missing as the backend has been replaced with static assets.
                        Feel free to take a look around, and if you want to see more there's a link to my portfolio down in the footer. Cheers!
                    </p>
                </div>
                <div className='hidden md:block w-[1px] bg-black' />
                <div className='flex flex-col gap-4 md:w-3/5 md:pl-10'>

                    {/* Popular List */}
                    <div className="w-full">
                        <h1 className='mb-5 text-2xl md:text-3xl font-semibold w-full'>
                            Popular uploads
                        </h1>
                        <table className="my-5 w-full p-3 mb-10 table-fixed">
                            <thead className="bg-tabbi-dark-gray text-white w-full pr-4">
                                <tr className='w-full'>
                                    <th className="w-[35%] text-left pl-6 py-2">Title</th>
                                    <th className="w-[40%] text-left px-6 py-2">Artist</th>
                                    <th className="w-[25%] text-left self-right pr-6 py-2">Uploader</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popularList.map((upload, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-black pl-6 py-4 truncate">
                                            <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                                className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                                        </td>
                                        <td className="border-b border-black text-left px-6 py-4 truncate">{upload.artist}</td>
                                        <td className="text-left border-b border-black pr-6 py-4 truncate">{upload.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Recent List */}
                    <div className="w-full">
                        <h1 className='mb-5 text-2xl md:text-3xl font-semibold w-full'>
                            Recent uploads
                        </h1>
                        <table className="my-5 w-full p-3 mb-10 table-fixed">
                            <thead className="bg-tabbi-dark-gray text-white w-full">
                                <tr className='w-full'>
                                    <th className="w-[35%] text-left pl-6 py-2">Title</th>
                                    <th className="w-[40%] text-left px-6 py-2">Artist</th>
                                    <th className="w-[25%] text-left self-right pr-6 py-2">Uploader</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentList.map((upload, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-black pl-6 py-4 truncate">
                                            <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                                className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                                        </td>
                                        <td className="border-b border-black px-6 py-4 truncate">{upload.artist}</td>
                                        <td className="text-left border-b border-black pr-6 py-4 truncate">{upload.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage