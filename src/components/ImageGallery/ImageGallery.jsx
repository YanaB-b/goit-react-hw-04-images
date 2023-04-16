import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
const ImageGallery = ({ images, onSelect }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onSelect={() => onSelect(largeImageURL)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default ImageGallery;
