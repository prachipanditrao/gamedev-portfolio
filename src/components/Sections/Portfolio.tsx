import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';

import {isMobile} from '../../config';
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

  return (
    <div className="pb-6">
      <div className="bg-white p-3 text-center">
        <div className={classNames(
          'relative h-65 w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
        )} style={{height: '250px', width: '100%'}}>
          <Image alt={title} className="object-cover" layout="fill" src={image} />
          <ItemOverlay item={item} />
        </div>
      
        <div>
          <p className="inline-block bg-gray-600 text-sm text-gray-300 px-2 py-1 rounded-md">{year}</p>
          <p className="text-md font-bold">{title}</p>
        </div>
      </div>
    </div>
  );
});

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item:{url,title,description}}) => {
  const [mobile, setMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);

  useDetectOutsideClick(linkRef, () => setShowOverlay(false));

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (mobile && !showOverlay) {
        event.preventDefault();
        setShowOverlay(!showOverlay);
      }
    },
    [mobile, showOverlay],
  );

  return (
    <a
      className={classNames(
        'absolute inset-0 h-full w-full  bg-gray-900 transition-all duration-300',
        {'opacity-0 hover:opacity-80': !mobile},
        showOverlay ? 'opacity-80' : 'opacity-0',
      )}
      href={url}
      onClick={handleItemClick}
      ref={linkRef}
      target="_blank"
    >
      <div className="relative h-full w-full p-4">
        <div className="flex flex-col gap-y-2 h-full">
          <h2 className="text-center font-bold text-white opacity-100">{title}</h2>
          <p className="text-xs text-white opacity-100 sm:text-sm">{description}</p>
        </div>
        <ArrowTopRightOnSquareIcon className="absolute bottom-1 right-1 h-4 w-4 shrink-0 text-white sm:bottom-2 sm:right-2" />
      </div>
    </a>
  );
});