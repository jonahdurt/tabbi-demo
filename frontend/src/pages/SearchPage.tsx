import { Link, useSearchParams } from 'react-router-dom'
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { type Upload } from '../utilities/Types'

const SearchPage = () => {

    const [searchParams] = useSearchParams()

    const searchQuery = searchParams.get('query')

    const resultsList: Upload[] = [
        { title: `Hello ${searchQuery}`, artist: 'The Artist', public: true, popularity: 5, uploader: 10, id: '10', username: 'chris' },
        { title: `My Song`, artist: (searchQuery ? searchQuery : 'mystery'), public: true, popularity: 5, uploader: 10, id: '10', username: 'kaitlyn' }
    ]

    return (
        <>
            <h1 className='mb-8 text-3xl font-semibold'>
                Results for "{searchQuery}":
            </h1>

            <table className="table-fixed my-5 border-collapse w-full p-3 mb-10">
                <thead className="bg-tabbi-dark-gray text-white">
                    <tr>
                        <th className="w-[40%] md:w-[35%] text-left pl-6 py-2">Title</th>
                        <th className="w-[40%] md:w-[35%] text-left pl-6 py-2">Artist</th>
                        <th className="w-[0%] md:w-[15%] text-center py-2 truncate">Uploaded By</th>
                        <th className="w-[20%] md:w-[15%] text-center py-2">Saved</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsList.map((upload, index) => (
                        <tr key={index}>
                            <td className="border-b border-black pl-6 py-4 truncate">
                                <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                    className="font-bold text-tabbi-primary hover:underline truncate">{upload.title}</Link>
                            </td>
                            <td className="border-b border-black pl-6 py-4">{upload.artist}</td>
                            <td className="text-center border-b border-black py-4 truncate">{upload.username}</td>
                            {
                                <td className="text-center border-b border-black py-4 truncate">
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