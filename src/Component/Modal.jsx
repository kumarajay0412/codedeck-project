import React, { useContext } from 'react'
import { ModalContext } from '../Context/ModalContext'
import { NewFolder, NewPlayGround, NewPlayGroundAndFolder, EditFolder, EditPlayGroundTitle, Loading } from './ModalTypes'

function Modal() {
    const { isOpenModal } = useContext(ModalContext)
    const { ModalType } = isOpenModal

    //Modal kitne prakar ke hai 
    //1. NewFolder
    //2. NewPlayGround
    //3. NewPlayGroundAndFolder
    //4. Rename Folder
    //5. Rename PlayGroundTitle
    console.log(ModalType)
    return (
        <div>
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                <div className='relative w-auto my-6 mx-auto max-w-3xl '
                    onClick={(e) => { e.stopPropagation() }}>
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline-none'>
                        {ModalType === 1 && <NewFolder />}
                        {ModalType === 2 && <NewPlayGround />}
                        {ModalType === 3 && <NewPlayGroundAndFolder />}
                        {ModalType === 4 && <EditFolder />}
                        {ModalType === 5 && <EditPlayGroundTitle />}
                        {ModalType === 6 && <Loading />}
                    </div>
                </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'> </div>
        </div>
    )
}

export default Modal