import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/listRoom';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <>
    {!isOwnerPath && <Navbar/>}
    {false && <HotelReg/>}
    <div className='min-h-screen w-full'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/rooms' element={<AllRooms/>}/>
        <Route path='/rooms/:id' element={<RoomDetails/>}/>
        <Route path='/my-bookings' element={<MyBooking/>}/>
        <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="add-room" element={<AddRoom/>}/>
        <Route path="list-room" element={<ListRoom/>}/>
        </Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App