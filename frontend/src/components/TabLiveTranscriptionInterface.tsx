const TabLiveTranscriptionInterface = () => {
    return (
        <>
            <div className='w-full'>
                <button
                    className={`h-8 mb-6 w-20 text-center border border-tabbi-med-gray bg-tabbi-light-gray text-tabbi-med-gray`}
                    onClick={() => { }}
                    disabled
                >
                    record
                </button>

                <div className='flex w-full justify-center h-auto text-2xl tracking-widest'>
                    <div className='w-[1200px] px-16 py-12 border border-black bg-white whitespace-pre'>
                        This feature is not available on the demo version of this site
                    </div>
                </div>
            </div>
        </>
    )
}

export default TabLiveTranscriptionInterface