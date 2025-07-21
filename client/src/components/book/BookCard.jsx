import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import ImagePreview from '../shared/ImagePreview';
import PriceTag from '../shared/PriceTag';
import RatingStars from '../shared/RatingStars';

const BookCard = ({ title, author, price, onAddToCart, cover }) => {
  return (
    <Card className="p-4 space-y-3">
      <ImagePreview src={cover} alt={title} />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">by {author}</p>
      <RatingStars rating={4} />
      <PriceTag price={price} />
      <Button onClick={onAddToCart}>Add to Cart</Button>
    </Card>
  );
};

export default BookCard;
