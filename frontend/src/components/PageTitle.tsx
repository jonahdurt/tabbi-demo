import React from 'react'

const PageTitle = ({children}: {children: React.ReactNode}) => {
  return (
    <h1 className='-mt-4 mb-6 md:ml-4 md:mt-8 md:mb-10 md:mx-8 text-3xl md:text-5xl font-semibold'>{children}</h1>
  )
}

export default PageTitle