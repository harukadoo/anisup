import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './style4.css'

export const Header = ({ userId, inputValue }: any) => {
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const closeSearch = () => {
    setSearchVisible(false);
  };

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__container">
        <div className="header-logo">
          <div className="header-logo__container">
            AniSup
          </div>
        </div>

        <div className="header-content">
          <div className="header-content__container">
            <div className="header-menu">
              <div className="header-menu__container">
                <Link to={`/about-us/${userId}`}>about us</Link>
                <Link to={`/main/${userId}`}>catalog</Link>
                <Link to={`/top100/${userId}`}>top 100</Link>
              </div>
            </div>

            <div className="header-navigation">
              <div className="header-navigation__container">

                <button className="header-navigation__btn" onClick={toggleSearch} style={{ display: isSearchVisible ? 'none' : 'block' }}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                <div className="header-search" style={{ display: isSearchVisible ? 'block' : 'none' }}>
                  <div className="header-search__container" >
                    <button className="header-search__close-btn" onClick={closeSearch}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>

                    <input type="text" className="header-search__input" />

                    <button type="submit" className="header-search__btn">
                      <Link to={`/search-list/${inputValue}`}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    </button>
                  </div>
                </div>

                <button className="header-navigation__btn">
                  <Link to={`/home/${userId}`}>
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </button>

                <Link to={'/'} className="header-navigation__btn">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}