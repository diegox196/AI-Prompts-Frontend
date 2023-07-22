import React, { useState } from 'react';

/**
 * Carousel component displays a slideshow of images with navigation buttons.
 *
 * @param {Array} items - An array of objects representing the images to display in the carousel. Each object should have a "url" property specifying the image URL.
 */
const Carousel = ({ items }) => {
  console.log(items);
  const minImage = items.length > 1;
  const [activeItem, setActiveItem] = useState(0);

  /**
   * Handle the next button click event
   */
  const onNext = () => {
    setActiveItem(activeItem === items.length - 1 ? 0 : activeItem + 1);
  };

  /**
   * Handle the previous button click event
   */
  const onPrev = () => {
    setActiveItem(activeItem === 0 ? items.length - 1 : activeItem - 1);
  };

  /**
   * Handle image load error by replacing the broken image with a default image
   * @param {object} e - The image load event
   */
  const handleError = (e) => {
    e.target.onerror = null; // Prevents continuous error cycles
    e.target.src = "carousel-1.svg"; // Load the default image
  }

  return (
    <div className="flex justify-center mb-4">
      <div id="animation-carousel" className="relative w-56 md:w-96 h-56 md:h-96" data-carousel="static">

        {items && <>
          <div className="relative overflow-hidden rounded-lg h-full">

            {items.map((item, index) => (
              <div key={index} className={`duration-500 ease-in-out ${activeItem === index ? 'opacity-100' : 'opacity-0'}`} data-carousel-item>
                <img src={item.url}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."
                  onError={handleError} />
              </div>
            ))}

          </div>

          {minImage &&
            <>
              <button type="button" onClick={onPrev} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button type="button" onClick={onNext} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </>
          }
        </>
        }
      </div>
    </div>
  );
};

export default Carousel;