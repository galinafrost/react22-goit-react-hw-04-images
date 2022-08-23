import { Component } from 'react';
import { Hearts } from 'react-loader-spinner';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './../shared/components/Button';
import Modal from './../shared/components/Modal';

import { searchImages } from './../shared/services/api';

import styles from './image-search.module.css';

class ImageSearch extends Component {
  state = {
    isLoading: false,
    error: null,
    images: [],
    page: 1,
    search: '',
    modalOpen: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.setState({
        isLoading: true,
      });
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { page, search } = this.state;
    try {
      const data = await searchImages(page, search);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    }
  }

  changeSearch = ({ search }) => {
    if (search === this.state.search) {
      return;
    }
    this.setState({ search, images: [] });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  showModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: null,
    });
  };

  render() {
    const { images, modalContent, modalOpen, search, isLoading, error } =
      this.state;
    const { changeSearch, loadMore, closeModal, showModal } = this;

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
  }
}

export default ImageSearch;
