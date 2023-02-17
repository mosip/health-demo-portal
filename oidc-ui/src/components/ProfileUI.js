import { useTranslation } from "react-i18next";
import oidcService from "../services/oidcService";
import React, { useState, useEffect } from "react";


export default function ProfileUI({
    component,
    i18nKeyPrefix = "profileui",
    langOptions
}) {
    const { t, i18n } = useTranslation("translation", {
        keyPrefix: i18nKeyPrefix,
    });

    const [isOpen, setIsOpen] = useState(false);


    const currentDate = new Date();
    //Date with 10 days ahead from current date
    const futureDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);

    const options = { weekday: 'long' };
    const futureWeekday = new Intl.DateTimeFormat('en-US', options).format(futureDate);

    //Date with 10 days before from current date
    const pastDate = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000);



    //Getting JSON data of claim Providers
    const [claimProvider, fetchClaimProviders] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/claimproviders')
            .then((res) => res.json())
            .then((res) => fetchClaimProviders(res)
            )
    }, []);

    //Getting Medication from json
    const [medications, fetchMedications] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/medications')
            .then((res) => res.json())
            .then((res) => {
                fetchMedications(res);

            })
    }, []);
    const count = medications.length;
    //Getting message information from json
    const [messages, fetchMessages] = useState([])
    useEffect(() => {
        fetch('http://localhost:3100/messages')
            .then((res) => res.json())
            .then((res) => {
                fetchMessages(res)
            })
    }, []);
    const messageCount = messages.length;

    const [appointment, fetchAppointment] = useState([])
    useEffect(() => {
        fetch('http://localhost:3200/appointment')
            .then((res) => res.json())
            .then((res) => {
                fetchAppointment(res)
            })
    }, []);

    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen overflow-hidden transition-transform -translate-x-full shadow-md sm:translate-x-0 " aria-label="Sidebar" >
                <div className="h-full px-3 py-4 overflow-y-auto ">
                    <div className="flex items-center justify-center col-start-1">
                        <img src="images/doctor_logo.png" className="w-16 h-16 mx-4" />
                        <span className="title-font text-1xl text-gray-900 font-medium">Health Portal
                        </span>
                    </div>
                    <ul className=" py-2">

                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="2" />  <line x1="4" y1="10" x2="20" y2="10" />  <line x1="10" y1="4" x2="10" y2="20" /></svg>
                                <span className="ml-3">Health Snapshot</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Search</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Reports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7" />  <path d="M8.5 8.5l7 7" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Medications</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                                <svg className="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <rect x="8" y="15" width="2" height="2" /></svg>                                <span className="flex-1 ml-3 whitespace-nowrap">Schedule</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Health Records</span>
                            </a>
                        </li>
                        <div className="py-10">
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="h-5 w-5 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <line x1="3.6" y1="9" x2="20.4" y2="9" />  <line x1="3.6" y1="15" x2="20.4" y2="15" />  <path d="M11.5 3a17 17 0 0 0 0 18" />  <path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Help</span>
                                </a>
                            </li>
                        </div>
                    </ul>
                </div>
            </aside>


            <div className="p-4 sm:ml-64 overflow-auto  bg-gray-50 dark:bg-gray-800 font-sans bg-none" >
                <div className="flex flex-wrap  justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <a className="flex-1 items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Welcome,{oidcService.name}</span>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 bg-gray-50 font-sans">You have {messageCount} new messages that needs your attention</p>
                    </a>

                    <div className="flex items-center">

                        <div className="relative ">
                            <div className="flex">
                                <img
                                    alt={"profile_picture"} className="h-12 w-12 " src={oidcService?.picture}
                                />
                                <div className="flex ml-3 my-3">

                                    <p className="text-gray-500 truncate dark:text-gray-400 bg-gray-50" >{oidcService.name}</p>

                                </div>
                                <button
                                    className="flex items-center px-4 py-2  text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:text-gray-500  active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                                    onClick={() => setIsOpen(!isOpen)} >

                                    <svg className="h-5 w-5 ml-1 text-black" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="6 9 12 15 18 9" /></svg>

                                </button>
                            </div>
                            {isOpen && (
                                <div className="origin-top-left absolute left-0 mt-2 w-25 flow-root  shadow-lg">

                                    <div className="px-1 py-1 rounded-md bg-white shadow-xs overflow-clip truncate  w-29 ">
                                        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Email: {oidcService.email}</a>
                                        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">DOB: {oidcService.birthdate}</a>
                                        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Gender: {oidcService.gender}</a>

                                        <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Address: {oidcService.address}</a>
                                        <a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">Sign Out</a>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="p-1 ">
                    <div className="flex">
                        <div className="flex flex-wrap w-full sm:w-30 md:w-30 p-1">

                            <div className="w-full sm:w-1/2 md:w-30 p-1 ">
                                <p className="text-lg font-medium mb-4">Current Medication ({count})</p>

                                <div className="bg-white border border-gray-200 rounded   shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {medications.map((data, index) => (
                                                <li className="py-3 sm:py-1" key={index}>
                                                    <div className="flex items-center space-x-4">

                                                        <div className="flex-1 min-w-0 ">

                                                            <p className="text-xs font-medium text-gray-900 truncate dark:text-white whitespace-pre-wrap inline-flex">
                                                                <svg className="h-5 w-5 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7" />  <path d="M8.5 8.5l7 7" /></svg>
                                                                {data['tabletName']}
                                                            </p>
                                                            <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                                                {data['dailyDosage']}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </li>
                                            ))}

                                            <li>
                                                <div className="flex items-center justify-between my-1 ">
                                                    <a href="#" className="text-sm text-gray-500 truncate hover:underline dark:text-gray-400 ">See all interactions</a>
                                                    <a href="#" className="text-sm text-gray-500 truncate hover:underline dark:text-gray-400 inline-flex"  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -2 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="arcs"><path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" /></svg>
                                                        Request refill</a>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full sm:w-1/2 md:w-30 p-1">
                                <p className="text-lg font-medium mb-4">Next Appointment</p>
                                <div className="bg-white border border-gray-200 rounded shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flow-root">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {appointment.map((data, index) => (
                                                <li className="py-3 sm:py-1">
                                                    <div className="flex items-center space-x-4">

                                                        <div className="flex-1 min-w-0 my-1">
                                                            <p className=" font-medium text-lg text-gray-900 truncate dark:text-white whitespace-pre-wrap">
                                                                {futureDate.toDateString()}
                                                            </p>
                                                            <p className="text-xs text-gray-500 truncate dark:text-gray-400 inline-flex whitespace-pre-wrap">
                                                                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 6 12 12 16 14" /></svg>
                                                                {data['time']}
                                                            </p>

                                                            <div className="text-xs text-gray-500 truncate dark:text-gray-400 whitespace-pre-wrap inline-flex">
                                                                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />  <circle cx="12" cy="10" r="3" /></svg>
                                                                {data['location']}
                                                            </div>

                                                            <div className="py-2">
                                                                <div className="flex">
                                                                    <img className="w-8 h-8 rounded-full shadow-lg" src="./../images/doctor_logo.png" alt="Jese Leos image" />
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white whitespace-pre-wrap">
                                                                            {data['doctorName']}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                                                            {data['department']}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </li>
                                            ))}
                                            <li>
                                                <div className="flex items-center justify-center  border-t border-gray-300">
                                                    <a href="#" className="text-sm text-blue-600 hover:underline truncate dark:text-gray-400 my-0.5">
                                                        Manage Appointment
                                                    </a>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="w-full p-2 grid grid-cols-3 rounded bg-white border border-gray-200  shadow sm:p-2 m-1 dark:bg-gray-800 dark:border-gray-700">
                                <div>
                                    <p className=" text-lg font-medium  dark:text-gray-400">My Paid claims</p>
                                </div>
                                <div className="col-end-5">
                                    <a href="#" className=" text-sm text-gray-500 truncate dark:text-gray-400 hover:underline">View claim history</a>
                                </div>
                            </div>
                            <div className="flex">

                                <table className="w-full  p-4 mx-1 mb-4  whitespace-no-wrap overflow-x-scroll  shadow-lg text-sm text-left text-gray-500 dark:text-gray-400 shadow-md ">
                                    <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                                        <tr >
                                            <th scope="col" className="px-6 py-3">
                                                <p>Provider Details</p>

                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Cost to claimant
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Benefite Paid
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total Cost
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claimProvider.map((item) => {
                                            const pastDate = new Date(currentDate.getTime() - item['days'] * 24 * 60 * 60 * 1000);
                                          
                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.providerName}>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <p className="text-xs">{item['providerName']}</p>
                                                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">{item['providerDeptAndPlace']}</p>
                                                    </th>
                                                    <td className="px-6 py-4">

                                                        <p>{pastDate.toLocaleDateString()}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p> {item['costToClaimant']}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p>{item['benifitePaid']}</p>
                                                    </td>
                                                    <th className="px-6 py-4">
                                                        <p>{item['totalCost']}</p>
                                                    </th>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>

                            </div>


                        </div>
                        <div className="w-full sm:w-1/2 md:w-30 p-2">
                            <p className="text-lg font-medium mb-4">New Messages <span className="">({messageCount})</span></p>
                            {messages.map((message, index) => {

                                const pastDate = new Date(currentDate.getTime() - message['days'] * 24 * 60 * 60 * 1000);
                                return(
                                <div className=" bg-white overflow-auto border rounded border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow sm:p-4 dark:bg-gray-800 dark:border-gray-700 " key={index}>
                                    <div className="flex ">
                                        <img className="w-8 h-8 rounded-full shadow-lg" src="./../images/doctor_logo.png" alt="Jese Leos image" />

                                        <div className="ml-3">

                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {message['doctorName']}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {pastDate.toDateString()}
                                            </p>

                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400 whitespace-pre-wrap">
                                                Hi {oidcService.name}, {message['message']}
                                            </p>
                                        </div>
                                        <button type="button" className="ml-auto -mx-1.5 -my-1.5  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                                            <span className="sr-only">Close</span>
                                            <svg className="h-4 w-4 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>                                        </button>
                                    </div>

                                </div>



                            )})}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
