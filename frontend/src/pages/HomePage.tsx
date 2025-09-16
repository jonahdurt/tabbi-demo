import { type Upload } from "../utilities/Types";
import { Link } from "react-router-dom";

const HomePage = () => {
    const popularList: Upload[] = [
        {artist: "artist1", public: true, popularity: 5, title: "hello", uploader: 2, id: '0', username: 'josh'},
        {artist: "artist2", public: true, popularity: 4, title: "world", uploader: 3, id: '1', username: 'katie'},
        {artist: "artist3", public: true, popularity: 3, title: "nice", uploader: 4, id: '2', username: 'josh'},
        {artist: "artist4", public: true, popularity: 2, title: "to meet", uploader: 5, id: '3', username: 'tim'},
        {artist: "artist5", public: true, popularity: 1, title: "you", uploader: 6, id: '4', username: 'amanda'}
    ]
    const recentList: Upload[] = [
        {artist: "artist1", public: true, popularity: 5, title: "hello", uploader: 2, id: '0', username: 'josh'},
        {artist: "artist2", public: true, popularity: 4, title: "world", uploader: 3, id: '1', username: 'katie'},
        {artist: "artist3", public: true, popularity: 3, title: "nice", uploader: 4, id: '2', username: 'josh'},
        {artist: "artist4", public: true, popularity: 2, title: "to meet", uploader: 5, id: '3', username: 'tim'},
        {artist: "artist5", public: true, popularity: 1, title: "you", uploader: 6, id: '4', username: 'amanda'}
    ]

    return (
        <>
            <div className='flex flex-col md:flex-row w-full justify-between mt-6'>
                <div className='flex flex-col gap-8 md:w-2/5 pr-10'>
                    <h1 className='text-5xl font-bold'>
                        Welcome to Tabbi!
                    </h1>
                    <p className='text-xl '>
                        Your ultimate companion for mastering the guitar is here.
                        Effortlessly transform your favorite audio into accurate tabs with our automatic transcription feature.
                        Say goodbye to tedious manual notation and hello to instant playable arrangements.
                        <br />
                        <br />
                        But Tabbi is more than just tabs! We've created a comprehensive practice environment for guitarists of all levels.
                        Use our built-in tuner and isolate instrument tracks with source separation while studying generated tabs.
                        Elevate your guitar skills and make practice more effective with Tabbi.
                    </p>
                </div>
                <div className='w-[1px] bg-black' />
                <div className='flex flex-col gap-4 w-3/5 pl-10'>
                    {popularList.length > 0 && (
                        <div className="w-full">
                            <h1 className='mb-5 text-3xl font-semibold w-full'>
                                Most popular
                            </h1>
                            <table className="my-5 w-full p-3 mb-10">
                                <thead className="bg-tabbi-dark-gray text-white w-full">
                                    <tr className='w-full'>
                                        <th className="w-[40%] text-left pl-6 py-2">Title</th>
                                        <th className="w-[40%] text-left px-6 py-2">Artist</th>
                                        <th className="w-[20%] text-left self-right pr-6 py-2">Uploaded By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {popularList.map((upload, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-black pl-6 py-4">
                                                <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                                    className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                                            </td>
                                            <td className="border-b border-black text-left px-6 py-4">{upload.artist}</td>
                                            <td className="text-left border-b border-black pr-6 py-4">{upload.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {recentList.length > 0 && (
                        <div className="w-full">
                            <h1 className='mb-5 text-3xl font-semibold w-full'>
                                Recent uploads
                            </h1>
                            <table className="my-5 w-full p-3 mb-10">
                                <thead className="bg-tabbi-dark-gray text-white w-full">
                                    <tr className='w-full'>
                                        <th className="w-[40%] text-left pl-6 py-2">Title</th>
                                        <th className="w-[40%] text-left px-6 py-2">Artist</th>
                                        <th className="w-[20%] text-left self-right pr-6 py-2">Uploaded By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentList.map((upload, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-black pl-6 py-4">
                                                <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                                    className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                                            </td>
                                            <td className="border-b border-black px-6 py-4">{upload.artist}</td>
                                            <td className="text-left border-b border-black pr-6 py-4">{upload.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage