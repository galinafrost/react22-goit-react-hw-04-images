import { useState, useEffect, useCallback } from 'react';
import { Hearts } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './../shared/components/Button';
import Modal from './../shared/components/Modal';

import { searchImages } from './../shared/services/api';

import styles from './image-search.module.css';

const ImageSearch = () => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    images: [],
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [modal, setModal] = useState({
    modalOpen: false,
    modalContent: null,
  });

  useEffect(() => {
    const fetchImages = async () => {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: null,
      }));

      try {
        const data = await searchImages(page, search);
        setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error: error.message,
          isLoading: false,
        }));
      }
    };

    if (search) {
      fetchImages();
    }
  }, [page, search]);

  const changeSearch = ({ search: newSearch }) => {
    if (search !== newSearch) {
      setSearch(newSearch);
      setState(prevState => ({
        ...prevState,
        images: [],
      }));
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showModal = modalContent => {
    setModal({
      modalOpen: true,
      modalContent,
    });
  };

  const closeModal = useCallback(() => {
    setModal({
      modalOpen: false,
      modalContent: null,
    });
  }, []);

  const { images, isLoading, error } = state;
  const { modalOpen, modalContent } = modal;
  const noInfo = !images.length && search && !isLoading && !error;
  const buttonLoadMore = images.length > 0;

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={changeSearch} />
      {error && <p>Упс, что-то пошло не так</p>}
      {noInfo && <p>Упс, а ничего нет, попробуйте найти синоним</p>}
      <ImageGallery images={images} handleClick={showModal} />
      {modalOpen && (
        <Modal close={closeModal}>
          <div>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </div>
        </Modal>
      )}
      <div className={styles.load}>
        {isLoading && (
          <Hearts
            color="#c576b4"
            height={500}
            width={500}
            timeout={3000}
            className={styles.loader}
          />
        )}
      </div>
      {buttonLoadMore && <Button onClick={loadMore} text="More" />}
    </div>
  );
};

export default ImageSearch;
