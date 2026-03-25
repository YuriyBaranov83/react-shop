import { useCallback, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";

const useHeaderProfileAuth = ({ isDesktopHover }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalSession, setAuthModalSession] = useState(0);

  const profileWrapRef = useRef(null);

  const closeProfile = useCallback(() => setIsProfileOpen(false), []);
  const closeAuth = useCallback(() => setIsAuthOpen(false), []);

  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const toggleProfile = useCallback(() => {
    setIsProfileOpen((value) => !value);
  }, []);

  const openAuth = useCallback(() => {
    setAuthModalSession((session) => session + 1);
    setIsAuthOpen(true);
  }, []);

  const handleProfileMouseEnter = useCallback(() => {
    if (!isDesktopHover) {
      return;
    }

    openProfile();
  }, [isDesktopHover, openProfile]);

  const handleProfileMouseLeave = useCallback(() => {
    if (!isDesktopHover) {
      return;
    }

    closeProfile();
  }, [closeProfile, isDesktopHover]);

  const handleProfileClick = useCallback(() => {
    if (isDesktopHover) {
      return;
    }

    toggleProfile();
  }, [isDesktopHover, toggleProfile]);

  const handleLoginClick = useCallback(() => {
    openAuth();
    closeProfile();
  }, [closeProfile, openAuth]);

  useClickOutside(profileWrapRef, closeProfile, isProfileOpen);

  return {
    authModalSession,
    closeAuth,
    closeProfile,
    handleLoginClick,
    handleProfileClick,
    handleProfileMouseEnter,
    handleProfileMouseLeave,
    isAuthOpen,
    isProfileOpen,
    profileWrapRef,
  };
};

export default useHeaderProfileAuth;
