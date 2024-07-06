import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, useEffect, useRef, useState} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Check out some of my work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {portfolioItems.map((item, index) => (
            <PortfolioItemCard item={item} key={`${item.title}-${index}`}/>
          ))}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const PortfolioItemCard: FC<{item: PortfolioItem}> = memo(({item}) => {
  const {image, title, year} = item;
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="pb-6">
      <div className="bg-white p-3 text-center">
        <div
          className={classNames(
            'relative h-65 w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl cursor-pointer',
          )}
          style={{ height: '250px', width: '100%' }}
          onClick={togglePopup}
        >
          <Image alt={title} className="object-cover" layout="fill" src={image} />
        </div>
        <div>
            <p className="inline-block bg-gray-600 text-sm text-gray-300 px-2 py-1 rounded-md">{year}</p>
            <p className="text-md font-bold">{title}</p>
        </div>
      </div>
      {showPopup && (
        <Popup item={item} onClose={togglePopup} />
      )}
    </div>
  );
});

const Popup: FC<{ item: PortfolioItem; onClose: () => void }> = memo(({ item, onClose }) => {
  const { title, image, description } = item;
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Additional logic can go here for popup initialization
  }, []);

  useDetectOutsideClick(linkRef, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 max-w-lg rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg">
          <Image alt={title} className="object-cover" layout="fill" src={image} />
        </div>
        <div className="mt-4 max-h-36 overflow-y-auto">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
});