import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({});
  const [nftCollection, setNftCollection] = useState(new Array(8).fill(0));
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function getAuthor() {
      try {
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        setAuthor(response.data);
        setFollowers(response.data.followers);
        setNftCollection(response.data.nftCollection);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthor();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="200px" height="24px" />
                          ) : (
                            <>{author.authorName}</>
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton width="100px" height="16px" />
                            ) : (
                              <>@{author.tag}</>
                            )}
                          </span>
                          {loading ? (
                            <Skeleton width="250px" height="16px" />
                          ) : (
                            <>
                              <span id="wallet" className="profile_wallet">{author.address}</span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="150px" height="40px" />
                      ) : (
                        <>
                          <div className="profile_follower">{followers} followers</div>
                          <Link to="#" className="btn-main" onClick={() => setFollowers(followers + 1)}>
                            Follow
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={nftCollection}
                    authorImage={author.authorImage}
                    authorId={author.authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
