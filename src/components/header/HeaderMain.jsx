import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Container from "../layout/Container";
import clsx from "clsx";

import { IoSearch, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaHeart, FaUser, FaBasketShopping } from "react-icons/fa6";

import CatalogDropdown from "./CatalogDropdown";
import CatalogSearchDropdown from "./CatalogSearchDropdown";
import MobileCatalogDrawer from "./MobileCatalogDrawer";
import ProfilePopover from "../../features/auth/ui/ProfilePopover";
import AuthModal from "../../features/auth/ui/AuthModal";
import { logo } from "@assets/images";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import useHeaderMainLogic from "./hooks/useHeaderMainLogic";

const HeaderMain = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const hasFavorites = favoritesCount > 0;

  const {
    catalog: { catalogWrapRef, closeCatalog, isCatalogOpen, isMobileCatalog, toggleCatalog },
    profileAuth: {
      authModalSession,
      closeAuth,
      closeProfile,
      handleLoginClick,
      handleProfileClick,
      handleProfileMouseEnter,
      handleProfileMouseLeave,
      isAuthOpen,
      isDesktopHover,
      isProfileOpen,
      profileWrapRef,
    },
    search: {
      handleSearchCategorySelect,
      handleSearchInputChange,
      handleSearchInputFocus,
      handleSearchProductSelect,
      handleSearchShowAllResults,
      handleSearchSubmit,
      isSearchDropdownVisible,
      isMobileSearchOpen,
      minSearchQueryLength,
      mobileSearchInputRef,
      openMobileSearchFromDrawer,
      popularProducts,
      searchCategoryResults,
      searchProductResults,
      searchQuery,
      searchWrapRef,
      toggleMobileSearch,
    },
  } = useHeaderMainLogic();

  return (
    <div className={styles["header-main"]}>
      <Container className="flex-between">
        <div className={clsx("flex-center", styles.left)}>
          <Link to="/" className={styles.logo} aria-label="Urbanfood - на головну">
            <img src={logo} alt="Логотип Urbanfood" />
          </Link>
          <div className={styles["catalog-wrap"]} ref={catalogWrapRef}>
            <button
              type="button"
              className={clsx(
                "flex-center",
                styles.catalog,
                isCatalogOpen && styles["catalog-active"]
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
              isMobileCatalog && styles["search-mobile"],
              isMobileSearchOpen && styles["search-mobile-open"]
            )}
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <IoSearch className={styles["search-icon"]} />
            <button
              type="button"
              className={styles["search-toggle"]}
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
              value={searchQuery}
              placeholder="Почати пошук"
              autoComplete="off"
              onFocus={handleSearchInputFocus}
              onChange={handleSearchInputChange}
            />
            {isSearchDropdownVisible ? (
              <CatalogSearchDropdown
                query={searchQuery}
                minLength={minSearchQueryLength}
                popularProducts={popularProducts}
                productResults={searchProductResults}
                categoryResults={searchCategoryResults}
                onProductSelect={handleSearchProductSelect}
                onCategorySelect={handleSearchCategorySelect}
                onShowAllResults={handleSearchShowAllResults}
              />
            ) : null}
          </form>
        </div>

        <div className={clsx("flex-center", styles.right)}>
          <button
            type="button"
            className={clsx(styles.favorite, hasFavorites && styles["favorite-active"])}
            aria-label="Обране"
            aria-pressed={hasFavorites}
            onClick={() => navigate("/favorites")}
          >
            <FaHeart />
          </button>

          <div
            ref={profileWrapRef}
            className={styles["profile-wrap"]}
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

          <button
            type="button"
            className={styles.basket}
            aria-label="Кошик"
            onClick={() => navigate("/cart")}
          >
            <FaBasketShopping />
            <span className={styles["basket-text"]}>
              {cartCount > 0 ? `Кошик (${cartCount})` : "Кошик"}
            </span>
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
