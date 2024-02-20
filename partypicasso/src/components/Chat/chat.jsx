import 'bootstrap/dist/css/bootstrap.min.css';
import '../.././App.css';
import Logo from './logo';
import Contact from './Contact';
import { useState } from 'react';

export default function Chat(){

    const [selectedUserId,setSelectedUserId] = useState(null);

    return (
        <div className="flex h-screen">
            <div className="bg-white w-1/3 flex flex-col">
                <div className="flex-grow" >
                    <Logo />
                    <Contact
                        key = "1"
                        id = "1"
                        online= {true}
                        username = "Google"
                        onClick = {() => setSelectedUserId(1)}
                        selected = {true} />
                    <Contact
                    key = "2" 
                    id = "2"
                    online = {false}
                    username = "Meta"
                    onClick = {() => setSelectedUserId(2)}
                    selected = {false}/>
                </div>
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 px-2">
                <div className="flex-grow height">
                    {!selectedUserId && (
                    <div className="flex-grow items-center justify-center">
                        <div className="text-gray-300">&larr; 
                            Select a person from the sidebar
                        </div>
                    </div>
                    )}
                    {!!selectedUserId && (
                    <div className="relative h-full">
                        <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                            <div key= "1" className={true ? 'text-right': 'text-left'}>
                                <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " +(true ? 'bg-blue-500 text-white':'bg-white text-gray-500')}>
                                "Hello Google"
                                {false && (
                                    <div className="">
                                    <a target="_blank" className="flex items-center gap-1 border-b" href= "none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                        </svg>
                                        "You tube"
                                    </a>
                                    </div>
                                )}
                                </div>
                            </div>

                            
                            <div key= "1" className={false ? 'text-right': 'text-left'}>
                                <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " +(false ? 'bg-blue-500 text-white':'bg-white text-gray-500')}>
                                "Hello Team Party Pandas"
                                {false && (
                                    <div className="">
                                    <a target="_blank" className="flex items-center gap-1 border-b" href= "none">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                        </svg>
                                        "You tube"
                                    </a>
                                    </div>
                                )}
                                </div>
                            </div>


                            <div ></div>
                        </div>
                    </div>
                    )}
                </div>
                <form className="flex gap-2 my-10" onSubmit>
                    <input type="text"
                        value= "Message Text"
                        placeholder="Type your message here"
                        className="bg-white flex-grow border rounded-sm p-2"/>
                    <label className="bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
                        <input type="file" className="hidden" onChange />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                        </svg>
                    </label>
                    <button type="submit" className="bg-blue-500 p-2 text-white rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}