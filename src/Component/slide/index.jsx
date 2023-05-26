import {useEffect, useState} from 'react';
import {getBanner} from "../../Redux/api/banner";
import {Link} from "react-router-dom";
const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([]);
    let index = 0, index1=0;
    useEffect( () => {
        async function getData(){
            setData(await getBanner());
        }
        getData();
    }, [])
    const handlePrevClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? index-1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === index-1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div id="indicators-carousel" className="relative w-full my-4" data-carousel="static">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {data.map(user => (
                    <Link key={user._id}
                        to={user.extenalLink}
                        className={`duration-700 ease-in-out ${
                            activeIndex === index++ ? 'block' : 'hidden'
                        }`}
                        data-carousel-item="active"
                    >
                        <img
                            src={"http://localhost:8000/"+user.urlImg}
                            className=" block w-full"
                            alt="..."
                        />
                        <div className={"absolute left-20 bottom-10 text-gray-300 bg-gray-900 px-4 py-4 rounded-2xl bg-opacity-60"}>
                        <h1 className={" text-2xl  "}>
                            {user.name}
                        </h1>
                        <span className={"mt-4 text-gray-500 hover:text-gray-300"}>
                            Xem chi tiết
                        </span>
                        </div>
                    </Link>
                ))}

            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {data.map(each => (
                    <button
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            activeIndex === index1 ? 'bg-gray-800' : 'bg-white'
                        }`}
                        aria-current={activeIndex === index1}
                        data-carousel-slide-to={index1}
                        onClick={() => setActiveIndex(index1)}
                        aria-label={`Slide ${index1++}`}
                    ></button>
                ))}

            </div>
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={handlePrevClick}
            >
    <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
    >
      <svg
          aria-hidden="true"
          className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
        ></path>
      </svg>
      <span className="sr-only">Previous</span>
    </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={handleNextClick}
            >
    <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
    >
      <svg
          aria-hidden="true"
          className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <span className="sr-only">Next</span>
    </span>
            </button>
        </div>);
};

export default Carousel;
