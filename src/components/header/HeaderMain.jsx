import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import Container from "../layout/Container";
import clsx from "clsx";

import { IoSearch, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaHeart, FaUser, FaBasketShopping } from "react-icons/fa6";

import CatalogDropdown from "./CatalogDropdown";
import MobileCatalogDrawer from "./MobileCatalogDrawer";
import ProfilePopover from "../../features/auth/ui/ProfilePopover";
import AuthModal from "../../features/auth/ui/AuthModal";
import { logo } from "@assets/images";

const MOBILE_CATALOG_MEDIA = "(max-width: 900px)";

const HeaderMain = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileCatalog, setIsMobileCatalog] = useState(() =>
    window.matchMedia(MOBILE_CATALOG_MEDIA).matches
  );
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalSession, setAuthModalSession] = useState(0);

  const [isDesktopHover, setIsDesktopHover] = useState(false);

  const catalogWrapRef = useRef(null);
  const searchWrapRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  
  const profileWrapRef = useRef(null);

  const toggleCatalog = () => {
    if (isMobileCatalog) setIsMobileSearchOpen(false);
    setIsCatalogOpen((v) => !v);
  };
  const closeCatalog = () => setIsCatalogOpen(false);

  const toggleProfile = () => setIsProfileOpen((v) => !v);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const openAuth = () => {
    setAuthModalSession((prev) => prev + 1);
    setIsAuthOpen(true);
  };
  const closeAuth = () => setIsAuthOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsDesktopHover(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_CATALOG_MEDIA);
    const onChange = (event) => {
      setIsMobileCatalog(event.matches);
      setIsCatalogOpen(false);
      setIsMobileSearchOpen(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

 
  useEffect(() => {
    if (!isCatalogOpen || isMobileCatalog) return;

    const onDown = (e) => {
      if (!catalogWrapRef.current) return;
      if (!catalogWrapRef.current.contains(e.target)) closeCatalog();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isCatalogOpen, isMobileCatalog]);

  useEffect(() => {
    if (!isCatalogOpen || !isMobileCatalog) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isCatalogOpen, isMobileCatalog]);

  useEffect(() => {
    if (!isMobileCatalog || !isMobileSearchOpen) return;

    mobileSearchInputRef.current?.focus();
  }, [isMobileCatalog, isMobileSearchOpen]);

  useEffect(() => {
    if (!isMobileCatalog || !isMobileSearchOpen) return;

    const onDown = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isMobileCatalog, isMobileSearchOpen]);


  useEffect(() => {
    if (!isProfileOpen) return;

    const onDown = (e) => {
      if (!profileWrapRef.current) return;
      if (!profileWrapRef.current.contains(e.target)) closeProfile();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isProfileOpen]);

  
  useEffect(() => {
    if (!isCatalogOpen && !isProfileOpen && !isAuthOpen && !isMobileSearchOpen) return;

    const onKey = (e) => {
      if (e.key !== "Escape") return;
      closeCatalog();
      closeProfile();
      closeAuth();
      setIsMobileSearchOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCatalogOpen, isProfileOpen, isAuthOpen, isMobileSearchOpen]);

  
  const handleProfileMouseEnter = () => {
    if (!isDesktopHover) return;
    openProfile();
  };

  const handleProfileMouseLeave = () => {
    if (!isDesktopHover) return;
    closeProfile();
  };

  const handleProfileClick = () => {
    if (isDesktopHover) return;
    toggleProfile();
  };

  const handleLoginClick = () => {
    openAuth();
    closeProfile();
  };

  const toggleMobileSearch = () => {
    if (!isMobileCatalog) return;
    if (isCatalogOpen) closeCatalog();
    setIsMobileSearchOpen((prev) => !prev);
  };

  const openMobileSearchFromDrawer = () => {
    setIsCatalogOpen(false);
    setIsMobileSearchOpen(true);
  };

  return (
    <div className={styles.header__main}>
      <Container className="flex-between">
        <div className={clsx("flex-center", styles.left)}>
          <a href="/" className={styles.logo} aria-label="My Shop">
            <img src={logo} alt="Logo" />
          </a>
          <div className={styles.catalog__wrap} ref={catalogWrapRef}>
            <button
              type="button"
              className={clsx(
                "flex-center",
                styles.catalog,
                isCatalogOpen && styles.catalog__active
              )}
              onClick={toggleCatalog}
              aria-expanded={isCatalogOpen}
              aria-haspopup="menu"
            >
              {isCatalogOpen ? <IoCloseOutline /> : <IoMenuOutline />}
              <span>Каталог</span>
            </button>

            {isCatalogOpen && !isMobileCatalog && <CatalogDropdown onClose={closeCatalog} />}
          </div>

          <form
            ref={searchWrapRef}
            className={clsx(
              styles.search,
              isMobileCatalog && styles.search_mobile,
              isMobileSearchOpen && styles.search_mobile_open
            )}
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <IoSearch className={styles.search__icon} />
            <button
              type="button"
              className={styles.search__toggle}
              onClick={toggleMobileSearch}
              aria-label={isMobileSearchOpen ? "Закрити пошук" : "Відкрити пошук"}
              aria-expanded={isMobileSearchOpen}
              aria-controls="header-search-input"
            >
              <IoSearch />
            </button>
            <input
              id="header-search-input"
              ref={mobileSearchInputRef}
              type="search"
              name="search"
              placeholder="Почати пошук"
              autoComplete="off"
            />
          </form>
        </div>

        <div className={clsx("flex-center", styles.right)}>
          <button type="button" className={styles.favorite} aria-label="Обране">
            <FaHeart />
          </button>

          <div
            ref={profileWrapRef}
            className={styles.profile__wrap}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button
              type="button"
              className={styles.profile}
              aria-label="Профіль"
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
              onClick={handleProfileClick}
            >
              <FaUser />
            </button>

            <ProfilePopover
              isOpen={isProfileOpen}
              mode={isDesktopHover ? "hover" : "click"}
              isAuthed={false}
              onLoginClick={handleLoginClick}
              onClose={closeProfile}
            />
          </div>

          <button type="button" className={styles.basket} aria-label="Кошик">
            <FaBasketShopping />
            <span className={styles.baske__text}>Кошик</span>
          </button>
        </div>
      </Container>

      <AuthModal
        key={authModalSession}
        isOpen={isAuthOpen}
        onClose={closeAuth}
      />

      {isMobileCatalog && isCatalogOpen && (
        <MobileCatalogDrawer
          onClose={closeCatalog}
          onSearchClick={openMobileSearchFromDrawer}
        />
      )}
    </div>
  );
};

export default HeaderMain;
