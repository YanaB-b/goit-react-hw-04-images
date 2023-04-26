import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import { getImages } from '../NewsApiService';
import css from './App.module.css';
export const App = () => {
  const [nameValue, setNameValue] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.nameValue !== this.state.nameValue ||
  //     prevState.currentPage !== this.state.currentPage
  //   ) {
  //     this.onImages();
  //   }
  // }
  useEffect(() => {
    const onImages = () => {
      setIsLoading(true)
      getImages(nameValue, currentPage)
        .then(images => {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setLoadMore(currentPage < Math.ceil(images.totalHits / 12));
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        })
        .finally(() => {
          setIsLoading(false);
          
        });
    };
    if (nameValue === '') {
      return;
    }
    onImages();
  }, [nameValue, currentPage]);

  const handleChecked = nameValue => {
    setNameValue(nameValue);

    setImages([]);
    setCurrentPage(1);
    setStatus('pending');
  };
  const toggleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };

  const onSelect = largeImageURL => {
    setSelectedImage(largeImageURL);
    setIsShowModal(true);
  };

  const handleOpen = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleChecked}></Searchbar>
      {status === 'idle' && (
        <h2 className={css.appTitle}>Please enter your search query</h2>
      )}
     
      

      {status === 'rejected' && (
        <h2 className={css.appTitle}>{error.message}</h2>
      )}

      <>
        {images.length > 0 &&   (
          <>
            <ImageGallery images={images} onSelect={onSelect} />
            {loadMore  && !isLoading && <Button onClick={handleOpen}>Load more</Button>}
     

          </>
        )}
        {images.length === 0 && status === 'resolved' && (
          <h2 className={css.appTitle}>
            Nothing was found. Please try another search.
          </h2>
        )}
      </>
      {isLoading && <Loader />}
      {isShowModal && (
        <Modal onClose={toggleModal} selectedImage={selectedImage}></Modal>
      )}
    </div>
  );
};

export default App;
