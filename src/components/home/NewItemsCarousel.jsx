import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ItemCard from '../UI/ItemCard';

const NewItemsCarousel = ({ items }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1, // 1 slide for mobile (0px and up)
      },
      600: {
        items: 2, // 2 slides for tablets (600px and up)
      },
      900: {
        items: 3, // 3 slides for desktops (900px and up)
      },
      1200: {
        items: 4, // never more than 4 items
      },
    },
  };
  return (
    <OwlCarousel {...options}>
      {items.map((item, index) => (
        <ItemCard key={index} item={item} index={index} page="newItems" />
      ))}
    </OwlCarousel>
  );
};

export default NewItemsCarousel;
