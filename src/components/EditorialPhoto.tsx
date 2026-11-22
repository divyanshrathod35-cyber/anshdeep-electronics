import { useEffect, useRef, useState } from 'react';
import type { Artwork } from '../data/catalog';
import { editorialUrl, photos } from '../data/editorialImages';
import { ProductArt } from './ProductArt';

/**
 * Local pinned photo first; original licensed CDN second; illustration last.
 * This avoids third-party image requests during normal production browsing.
 */
export function EditorialPhoto({ kind, hero = false }: { kind: Artwork; hero?: boolean }) {
  const photo = photos[kind];
  const [source, setSource] = useState<'local' | 'cdn' | 'illustration'>('local');
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => { setSource('local'); setLoaded(false); }, [kind]);

  const handleError = () => {
    setLoaded(false);
    setSource(current => current === 'local' ? 'cdn' : 'illustration');
  };

  // Static HTML may fetch or fail an image before React hydrates. An already
  // completed <img> does not replay its load/error event at hydration time.
  // Inspect it after mount so cached failures still advance through fallbacks.
  useEffect(() => {
    const image = imageRef.current;
    if (!image || !image.complete) return;
    if (image.naturalWidth > 0) setLoaded(true);
    else handleError();
  }, [kind, source]);

  const src = source === 'local'
    ? '/editorial/' + photo.id + '.jpg'
    : editorialUrl(photo.id, hero ? 1200 : 900);

  return (
    <div className={'editorial-frame' + (hero ? ' editorial-frame--hero' : '')} data-photo-id={photo.id}>
      {!loaded && source !== 'illustration' && (
        <div className="editorial-loading-mark" aria-hidden="true"><strong>A.</strong><span>ANSHDEEP / VISUAL EDIT</span></div>
      )}
      {source === 'illustration' && <ProductArt kind={kind} hero={hero} />}
      {source !== 'illustration' && (
        <img
          key={photo.id + '-' + source}
          ref={imageRef}
          className="editorial-photo"
          src={src}
          srcSet={source === 'cdn' ? (
            editorialUrl(photo.id, 540) + ' 540w, ' +
            editorialUrl(photo.id, 900) + ' 900w, ' +
            editorialUrl(photo.id, 1200) + ' 1200w'
          ) : undefined}
          sizes={source === 'cdn' ? (hero ? '(max-width: 930px) 100vw, 48vw' : '(max-width: 700px) 100vw, 50vw') : undefined}
          alt={photo.description}
          width={1200}
          height={864}
          loading="lazy"
          fetchPriority="auto"
          decoding="async"
          style={{ objectPosition: photo.position }}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
    </div>
  );
}
