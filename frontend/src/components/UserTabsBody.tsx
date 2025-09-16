import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { type Metadata, type Upload } from '../utilities/Types'
import TabView from './TabView'



interface UserTabsBodyProps {
    uploadedList: Metadata[],
    savedList: Upload[],
    fetchUploaded: () => void,
    fetchSaved: () => void,
}



const UserTabsBody: React.FC<UserTabsBodyProps> = ({ uploadedList, savedList, fetchUploaded, fetchSaved }) => {
    const [listView, setListView] = useState<ListView>("uploaded")

    type ListView = "uploaded" | "saved"

    // Stores which list is being displayed, uploaded or saved
    const displayedList = listView === "uploaded" ? uploadedList : savedList

    useEffect(() => {
        fetchUploaded()
        fetchSaved()
    }, [])

    return (
        <div>
            <div className='mb-10'>
                {/* Uploaded / Saved Tab Bar */}
                <div className='flex items-start gap-8 w-full px-8'>
                    <button
                        className={(listView === "uploaded" ? 'bg-tabbi-tertiary text-tabbi-light-gray' : 'bg-tabbi-light-gray border border-black -m-[1px] text-black hover:bg-tabbi-med-gray') + ' font-bold py-2 px-4 focus:outline-none focus:shadow-outline'}
                        onClick={() => {
                            setListView("uploaded");
                        }}
                        disabled={listView === "uploaded"}
                    >
                        Uploaded
                    </button>
                    <button
                        className={(listView === "saved" ? 'bg-tabbi-tertiary text-tabbi-light-gray' : 'bg-tabbi-light-gray border border-black -m-[1px] text-black hover:bg-tabbi-med-gray') + ' font-bold py-2 px-4 focus:outline-none focus:shadow-outline'}
                        onClick={() => setListView("saved")}
                        disabled={listView === "saved"}
                    >
                        Saved
                    </button>
                </div>
                <hr className="border-black" />

                {/* Uploaded Table */}
                <table className="table-fixed mt-2 border-collapse w-full p-3">
                    <thead className="bg-tabbi-dark-gray text-white ">
                        <tr>
                            <th className="w-[40%] md:w-[35%] text-left pl-6 py-2">Title</th>
                            <th className="w-[40%] md:w-[35%] text-left pl-6 py-2">Artist</th>
                            <th className="w-[0%] md:w-[15%] text-center py-2 truncate">Public</th>
                            <th className="w-[20%] md:w-[15%] text-center py-2">Saved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedList.map((upload, index) => (
                            <tr key={index}>
                                <td className="border-b border-black pl-6 py-4 truncate">
                                    <Link to={'/tab/' + upload.id + '?private=' + !upload.public}
                                        className="font-bold text-tabbi-primary hover:underline">{upload.title}</Link>
                                </td>
                                <td className="border-b border-black pl-6 py-4 truncate">{upload.artist}</td>
                                <td className="border-b border-black text-center py-4 truncate">{upload.public ? 'yes' : 'no'}</td>
                                <td className="border-b border-black text-center py-4 truncate">
                                    <Checkbox.Root
                                        className='flex size-[25px] appearance-none border border-black items-center justify-center mx-auto'
                                        checked={ listView === 'saved' || savedList.some(saved => saved.id === upload.id )}
                                        id={index.toString()}
                                        onCheckedChange={() => {}}
                                    >
                                        <Checkbox.Indicator>
                                            <CheckIcon />
                                        </Checkbox.Indicator>
                                    </Checkbox.Root>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Processing Uploads Table */}

            <div className='mt-20'>
                <div className='bg-tabbi-dark-gray w-52 ml-8 py-2 px-4 justify-items-center'>
                    <p className='text-tabbi-light-gray font-bold'>
                        Processing Uploads
                    </p>
                </div>
                <hr className="border-tabbi-dark-gray" />

                <table className="table-fixed mt-2 border-collapse w-full p-3">
                    <thead className="bg-tabbi-dark-gray text-white">
                        <tr>
                            <th className="w-[35%] md:w-[30%] text-left pl-6 py-2">Title</th>
                            <th className="w-[35%] md:w-[30%] text-left pl-6 py-2">Artist</th>
                            <th className="w-[30%] md:w-[15%] text-center pl-6 py-2">Progress</th>
                            <th className="w-[0%] md:w-[25%] text-center pl-6 py-2 truncate">Current process</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td className="border-b border-black pl-6 py-4 truncate">Never Ending Song</td>
                                <td className="border-b border-black pl-6 py-4 truncate">The Man Who Wasn't There</td>
                                <td className="border-b border-black text-center pl-6 py-4 truncate">3/5</td>
                                <td className="border-b border-black text-center pl-6 py-4 truncate">transcribing tabs</td>
                            </tr>
                            <tr>
                                <td className="border-b border-black pl-6 py-4 truncate">Helium Drone</td>
                                <td className="border-b border-black pl-6 py-4 truncate">Trainer</td>
                                <td className="border-b border-black text-center pl-6 py-4 truncate">1/5</td>
                                <td className="hidden md:block border-b border-black text-center pl-6 py-4 truncate">separating sources</td>
                            </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserTabsBody;