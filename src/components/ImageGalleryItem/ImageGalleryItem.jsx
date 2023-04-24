import css from './ImageGalleryItem.module.css';


const  ImageGalleryItem =({ webformatURL, largeImageURL, tags, onSelect })=>{
 const onClick = () => {
   onSelect(largeImageURL);
  };
  
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={onClick}
        />
      </li>
    );
  
}
export default ImageGalleryItem;