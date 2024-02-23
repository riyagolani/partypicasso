import React from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

function Footer() {
    return (
        <Router>
            <footer className="bg-neutral-700 text-white" >
                <div className="flex justify-center items-center sm:px-12 px-4 py-7 mt-10">
                    <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 font-semibold md:w-3/5">
                        Are you <span className="text-teal-400">ready</span>? Let the fun begin!
                    </h1>
                </div>
                <div className="grid grid-rows-2 place-items-end ">
                    <h1 className="text-sm px-3 font-semibold">Connect with us</h1>
                    <div className="grid grid-cols-3 px-3 py-2 gap-2">
                        <Link to="https://www.linkedin.com"><img src="./images/linkedin.png" alt="LinkedIn" width={20} height={20} /></Link>
                        <Link to="https://github.com"><img src="./images/github.png" alt="Github" width={20} height={20} /></Link>
                        <Link to="https://www.instagram.com" ><img src="./images/instagram.png" alt="Instagram" width={30} height={20} className="-mt-0.4"/></Link>
                    </div>
                </div>
            </footer>
        </Router>
    )
}

export default Footer