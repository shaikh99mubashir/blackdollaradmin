import React, { useState } from 'react'
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom'
import DailyHistory from '../Screens/DailyHistory'
import Dashboard from '../Screens/Dashboard'
import Login from '../Screens/Login'
import Marquee from '../Screens/Marquee'
import Notification from '../Screens/Notification'
import PushNotification from '../Screens/PushNotification'
import ScheduledVideoList from '../Screens/ScheduledVideoList'
import Setting from '../Screens/Setting'
import Slidebar from '../Screens/Slidebar'
import Support from '../Screens/Support'
import UpdatePassword from '../Screens/UpdatePassword'
import UploadVideo from '../Screens/UploadVideo'
const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='Dashboard' element={<Dashboard />} />
                <Route path='UploadVideo' element={<UploadVideo />} />
                <Route path='ScheduledVideoList' element={<ScheduledVideoList />} />
                <Route path='PushNotification' element={<PushNotification />} />
                <Route path='Setting' element={<Setting />} />
                <Route path='Support' element={<Support />} />
                <Route path='Marquee' element={<Marquee />} />
                <Route path='UpdatePassword' element={<UpdatePassword />} />
                <Route path='Notification' element={<Notification />} />
                <Route path='DailyHistory' element={<DailyHistory />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing