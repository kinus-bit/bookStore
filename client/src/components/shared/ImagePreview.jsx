import React from 'react';

const ImagePreview = ({ src, alt = 'Book cover' }) => {
  return (
    <img
      src={src || '/placeholder.jpg'}
      alt={alt}
      className="w-full h-48 object-cover rounded"
    />
  );
};

export default ImagePreview;
