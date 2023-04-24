import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';
const Modal = ({ onClose, selectedImage }) => {
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handlePressESC);
    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, [onClose]);

  const handleChange = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleChange}>
      <div className={css.modal}>
        <img src={selectedImage} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};

export default Modal;
