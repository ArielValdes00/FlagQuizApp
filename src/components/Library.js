import Image from 'next/image'
import React from 'react'
import LeftArrow from '../../public/left-arrow.png'

const Library = ({ flags, onClick }) => {

    const sortedFlags = [...flags].sort((a, b) => a.name.common.localeCompare(b.name.common));

    return (
        <section className='h-screen grid items-center justify-center max-w-sm'>
            <div className='bg-sky-400 shadow-lg px-3 rounded-lg shadow-md'>
                <div className='flex justify-between px-4 items-center pt-3 pb-4'>
                    <Image
                        src={LeftArrow}
                        height={25}
                        width={25}
                        alt='Return'
                        onClick={onClick}
                        loading="eager"
                        className='cursor-pointer'
                    />
                    <p className='text-2xl font-bold'>Library</p>
                </div>
                <div className='flex flex-col items-center gap-4 overflow-y-auto mb-4' style={{ maxHeight: '80vh' }}>
                    {sortedFlags.map((flag, index) => (
                        <div key={index} className='flex items-center gap-4 w-[90%]'>
                            <img src={`https://flagcdn.com/w80/${flag.cca2.toLowerCase()}.png`} alt={flag.name.common} />
                            <p className='font-bold'>{flag.name.common}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default Library