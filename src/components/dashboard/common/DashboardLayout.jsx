import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import HeaderDashboard from './HeaderDashboard'
import Sidebar from './Sidebar'

function DashboardLayout() {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const findNavbarHeight = (height) => {
        setHeight(height);
    };
    
    const findSidebarWidth = (width) => {
        setWidth(width);
    }

    const outLetProps = {
        height,
        width
    }

    return (
        <>
            <HeaderDashboard findNavbarHeight={findNavbarHeight} />
            <Outlet context={outLetProps} />
            <Sidebar navbarHeight={height} findSidebarWidth={findSidebarWidth} />
        </>
    )
}

export default DashboardLayout