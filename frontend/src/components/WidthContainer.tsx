import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const WidthContainer: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='flex w-full justify-center'>
            <div className='flex-grow max-w-[75rem] px-4 sm:px-6 lg:px-8'>
                {children}
            </div>
        </div>
    )
}

export default WidthContainer