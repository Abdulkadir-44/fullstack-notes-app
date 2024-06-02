import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../../redux/userSlice"
import { toast } from "sonner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from '@/utils/helper'

const DropDownMenu = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const clickExit = () => {
        dispatch(userLogout())
        toast.info("Çıkış yapıldı !")
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className='flex justify-center items-center outline-none bg-white w-8 h-8 rounded-full text-sm font-bold text-purple-600 md:w-10 md:h-10 md:text-base'>
                {/* <FaUser className='text-xl text-white' /> */}
                {getInitials(user.userInfo.fullName)}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={clickExit}
                    className="hover:bg-slate-200 hover:cursor-pointer font-semibold flex justify-center items-center">Çıkış</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropDownMenu

/*
bg-white flex justify-center items-center rounded-full w-12 h-12 font-bold text-purple-800 outline-none
*/