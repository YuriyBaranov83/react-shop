import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import Container from "../layout/Container";
import clsx from "clsx";

import { IoSearch, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaHeart, FaUser, FaBasketShopping } from "react-icons/fa6";

import CatalogDropdown from "./CatalogDropdown";
import ProfilePopover from "../../features/auth/ui/ProfilePopover";
import AuthModal from "../../features/auth/ui/AuthModal";
import { logo } from "@assets/images";

const HeaderMain = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalSession, setAuthModalSession] = useState(0);

  const [isDesktopHover, setIsDesktopHover] = useState(false);

  const catalogWrapRef = useRef(null);
  
  const profileWrapRef = useRef(null);

  const toggleCatalog = () => setIsCatalogOpen((v) => !v);
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
    if (!isCatalogOpen) return;

    const onDown = (e) => {
      if (!catalogWrapRef.current) return;
      if (!catalogWrapRef.current.contains(e.target)) closeCatalog();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isCatalogOpen]);


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
    if (!isCatalogOpen && !isProfileOpen && !isAuthOpen) return;

    const onKey = (e) => {
      if (e.key !== "Escape") return;
      closeCatalog();
      closeProfile();
      closeAuth();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCatalogOpen, isProfileOpen, isAuthOpen]);

  
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

            {isCatalogOpen && <CatalogDropdown onClose={closeCatalog} />}
          </div>

          <form
            className={styles.search}
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <IoSearch className={styles.search__icon} />
            <input
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
    </div>
  );
};

export default HeaderMain;
