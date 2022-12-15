import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import Card from '../Card'
import { ModalContext } from '../../Context/ModalContext'
import { PlaygroundContext } from '../../Context/PlaygroundContext'
import { useNavigate } from 'react-router'


function RightPaneHomeScreen() {
    const { openModal } = React.useContext(ModalContext);
    const { folders, deleteFolder, deleteCard } = React.useContext(PlaygroundContext);
    return (
        <div className='border-2 border-black h-screen p-8'>
            <div className='flex justify-between placeholder:mt-8 items-center'>
                <h2>My <span className='font-semibold text-2xl'>PlayGround</span></h2>
                <h4 onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: ""
                    }
                })}> <span className='font-semibold text-2xl'>+</span>{" "}New Folder</h4>
            </div>
            <hr className='mb-12 mt-4 bg-black' />

            <div className='flex flex-col my-8'>
                <div className='flex justify-between placeholder:mt-8 items-center'>
                    <div className='flex gap-4 items-center'>
                        <FcOpenedFolder size={'2em'} />
                        <h3 className='font-semibold'>DSA</h3>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <BiEditAlt size={'1.5em'} />
                        <IoTrashOutline size={'1.5em'} />
                        <h4 className='font-semibold'> <span className='font-semibold text-2xl'>+</span>{" "} New Playground</h4>
                    </div>
                </div>
            </div>

            <hr className='mb-12 mt-4 bg-black' />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                <Card>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-4'>
                            <img src='/logo-small.png' />
                            <div>
                                <h4>Stack Implementation</h4>
                                <h4>Language:cpp</h4>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <BiEditAlt size={'1.5em'} />
                            <IoTrashOutline size={'1.5em'} />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-4'>
                            <img src='/logo-small.png' />
                            <div>
                                <h4>Stack Implementation</h4>
                                <h4>Language:cpp</h4>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <BiEditAlt size={'1.5em'} />
                            <IoTrashOutline size={'1.5em'} />
                        </div>
                    </div>
                </Card>

            </div>

        </div>
    )
}

export default RightPaneHomeScreen