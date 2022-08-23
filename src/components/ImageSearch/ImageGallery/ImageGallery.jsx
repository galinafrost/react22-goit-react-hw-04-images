import PropTypes from 'prop-types';

import styles from './styles.module.css';

const ImageGallery = ({ images, handleClick }) => {
  return (
    <div className={styles.listItems}>
      <ul className={styles.list}>
        {images.map(({ webformatURL, id, largeImageURL, tags }) => {
          return (
            <li
              key={id}
              onClick={() => handleClick({ largeImageURL, tags })}
              className={styles.item}
            >
              <img src={webformatURL} alt={tags} className={styles.itemFoto} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  handleClick: PropTypes.func.isRequired,
};
