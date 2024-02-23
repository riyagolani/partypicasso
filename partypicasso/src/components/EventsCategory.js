import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
    {
        name: 'NFT.NYC 2024',
        date: 'Wed, Apr 3',
        time: '8:30 am',
        price: '$224',
        img: './images/musicconcert.jpg',
        category: 'Music Concerts'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/musicconcert.jpg',
        category: 'Music Concerts'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/musicconcert.jpg',
        category: 'Music Concerts'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/musicconcert.jpg',
        category: 'Music Concerts'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/musicconcert.jpg',
        category: 'Music Concerts'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/party.jpg',
        category: 'Party'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/party.jpg',
        category: 'Party'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/party.jpg',
        category: 'Party'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/party.jpg',
        category: 'Party'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/party.jpg',
        category: 'Party'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/comedy.jpg',
        category: 'Comedy Shows'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/comedy.jpg',
        category: 'Comedy Shows'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/comedy.jpg',
        category: 'Comedy Shows'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/comedy.jpg',
        category: 'Comedy Shows'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$100',
        img: './images/comedy.jpg',
        category: 'Comedy Shows'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$10',
        img: './images/educational.jpg',
        category: 'Educational Workshops'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$10',
        img: './images/educational.jpg',
        category: 'Educational Workshops'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$10',
        img: './images/educational.jpg',
        category: 'Educational Workshops'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$10',
        img: './images/educational.jpg',
        category: 'Educational Workshops'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$10',
        img: './images/educational.jpg',
        category: 'Educational Workshops'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$50',
        img: './images/business.jpg',
        category: 'Business Seminars'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$50',
        img: './images/business.jpg',
        category: 'Business Seminars'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$50',
        img: './images/business.jpg',
        category: 'Business Seminars'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$50',
        img: './images/business.jpg',
        category: 'Business Seminars'
    },
    {
        name: 'Lorem Ipsum',
        date: 'Mon, Jan 1',
        time: '9:00 am',
        price: '$50',
        img: './images/business.jpg',
        category: 'Business Seminars'
    },
]

function EventsCategory() {
    const [category, setCategory] = useState(false);
    const setCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2
    };
    return (
        <div className="w-11/12 m-auto">
            <div>
                <p>Explore events from our various categories: </p>
                <select id="category" onChange={setCategoryChange}>
                    <option>Music Concerts</option>
                    <option>Party</option>
                    <option>Educational Workshops</option>
                    <option>Business Seminars</option>
                    <option>Comedy Shows</option>
                </select>
            </div>
            {/* <p>{category}</p> */}
            <div className="mt-5">
                <Slider {...settings}>
                    {data.map((d) => {
                        // if (d.category == { category }) {
                        return (
                            <div className="bg-white h=[450px] text-black rounded-xl">
                                <div className="h-60 rounded-t-xl bg-orange-900 flex justify-center items-center">
                                    <img src={d.img} alt="" className="h-44 w-44 rounded-full" />
                                </div>
                                <div className=" flex flex-col justify-center items-center gap-4 p-4">
                                    <p className="text-xl font-bold">{d.name}</p>
                                    <p>{d.date} {d.time}</p>
                                    <p className="font-semibold">{d.price}</p>
                                    <button className="bg-neutral-700 text-white text-l w-40 px-5 py-1 rounded">Event Details</button>
                                </div>
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
        </div>
    )
}

export default EventsCategory