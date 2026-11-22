import { useEffect, useState } from 'react';
import type { Artwork } from '../data/catalog';
import { editorialUrl, photos } from '../data/editorialImages';
import { ProductArt } from './ProductArt';

export function EditorialPhoto({ kind, hero = false }: { kind: Artwork; hero?: boolean }) {
  const photo = photos[kind];
  const [failed, setFailed] = useState(false);

  useEffect(() => { setFailed(false); }, [kind]);

  return (
    <div className={'editorial-frame' + (hero ? ' editorial-frame--hero' : '')} data-photo-id={photo.id}>
      {!failed && (
        <img
          className="editorial-photo"
          src={editorialUrl(photo.id, hero ? 1200 : 900)}
          srcSet={editorialUrl(photo.id, 540) + ' 540w, ' + editorialUrl(photo.id, 900) + ' 900w, ' + editorialUrl(photo.id, 1200) + ' 1200w'}
          sizes={hero ? '(max-width: 930px) 100vw, 48vw' : '(max-width: 700px) 100vw, 50vw'}
          alt={photo.description}
          width={hero ? 1200 : 900}
          height={hero ? 864 : 648}
          loading={hero ? 'eager' : 'lazy'}
          fetchPriority={hero ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition: photo.position }}
          onError={() => setFailed(true)}
        />
      )}
      {failed && <ProductArt kind={kind} hero={hero} />}
    </div>
  );
}
