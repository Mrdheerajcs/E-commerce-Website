import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="container flex min-w-full">
            <div className="w-1/2">
                <img src="./images/error.jpg" alt=" " className="w-screen h-screen" />
            </div>
            <div className="err w-1/2 bg-white">
                <div className="h-1/2">
                    <h1 className="text-black font-bold text-7xl ml-44 mt-10">404</h1>
                    <p className="items-center ml-44 font-bold">Page Not Found</p>
                </div>
                <div className="mt-auto ml-36 ">
                    <p className='py-2'>Go To Home Page</p>
                    <Link to="/">
                        <button className="w-12 py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Click
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error