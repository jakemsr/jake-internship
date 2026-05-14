import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollectionsCarousel = ({ items }) => {
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
        <div key={index}>
          <div className="nft_coll">
            <div className="nft_wrap">
              {!item ? (
                <Skeleton width="400px" height="200px" />
              ) : (
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy img-fluid" alt={item.title} />
                </Link>
              )}
            </div>
            <div className="nft_coll_pp">
              {!item ? (
                <Skeleton width="60px" height="60px" borderRadius="50%" />
              ) : (
                <Link to={`/author/${item.authorId}`}>
                  <img className="lazy pp-coll" src={item.authorImage} alt="" />
                </Link>
              )}
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              {!item ? (
                <>
                  <Skeleton width="120px" height="20px" />
                  <br />
                </>
              ) : (
                <Link to="/explore">
                  <h4>{item.title}</h4>
                </Link>
              )}
              {!item ? (
                <Skeleton width="80px" height="20px" />
              ) : (
                <span>ERC-{item.code}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};

export default HotCollectionsCarousel;
