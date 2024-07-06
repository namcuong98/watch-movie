import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isRpsMenuDesktop = useMediaQuery({ maxWidth: 1414 });
  const isRpsMenuMobile = useMediaQuery({ minWidth: 768 });
  return { isRpsMenuDesktop, isRpsMenuMobile };
};

export const useResponsiveScreen = () => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1200 });
  const isMobile = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  return { isDesktop, isTablet, isMobile, isSmallMobile };
};

export const useResponsivenessOverall = () => {
  const rpsBannerInfoLogo = useMediaQuery({ minWidth: 1000 });
  const rpsBannerInfoBtn = useMediaQuery({ minWidth: 600 });
  const rpsSearch = useMediaQuery({ minWidth: 568 });
  const rpsButtonBanner = useMediaQuery({ maxWidth: 400 });
  return { rpsBannerInfoLogo, rpsBannerInfoBtn, rpsSearch, rpsButtonBanner };
};
