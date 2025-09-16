import { Link, useSearchParams, useLocation } from 'react-router-dom'
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { type Upload } from '../utilities/Types'

const SearchPage = () => {

    const location = useLocation()

    const [searchParams] = useSearchParams()

    const searchQuery = searchParams.get('query')

    const resultsList: Upload[] = [
        { title: `Hello ${searchQuery}`, artist: 'The Artist', public: true, popularity: 5, uploader: 10, id: '10', username: 'chris' },
        { title: `My Song`, artist: (searchQuery ? searchQuery : 'mystery'), public: true, popularity: 5, uploader: 10, id: '10', username: 'kaitlyn' }
    ]

    // Checks if an upload is in a user's saved list of uploads
    const isSaved = (targetId: string, searchedList: Upload[]): boolean => {
        return searchedList.some(upload => upload.id == targetId)
    }

    return (
        <>
            <h1 className='mt-8 mb-8 text-3xl font-semibold'>
                Results for "{searchQuery}":
            </h1>

            <table className="table-fixed my-5 border-collapse w-full p-3 mb-10">
                <thead className="bg-tabbi-dark-gray text-white">
                    <tr>
                        <th className="w-[35%] text-left pl-6 py-2">Title</th>
                        <th className="w-[35%] text-left pl-6 py-2">Artist</th>
                        <th className="w-[15%] text-center py-2">Uploaded By</th>
                        {<th className="w-[15%] text-center py-2">Saved</th>}
                    </tr>
                </thead>
                <tbody>
                    {resultsList.map((upload, index) => (
                        <tr key={index}>
                            <td className="border-b border-black pl-6 py-4">
                                <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                    className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                            </td>
                            <td className="border-b border-black pl-6 py-4">{upload.artist}</td>
                            <td className="text-center border-b border-black py-4">{upload.username}</td>
                            {
                                <td className="text-center border-b border-black py-4">
                                    <Checkbox.Root
                                        className='flex size-[25px] appearance-none border border-black items-center justify-center mx-auto'
                                        checked={true}
                                        id={index.toString()}
                                        onCheckedChange={() => { }}
                                    >
                                        <Checkbox.Indicator>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SearchPage