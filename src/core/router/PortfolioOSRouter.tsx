import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DeviceTier } from '../device/device-tier';
import { getTheme02StoreData } from '../../themes/theme-02/utils/theme02DataAdapter';
import { ThemeSkinProps } from './types';

interface PortfolioOSRouterProps {
  tier: DeviceTier;
  SkinComponent: React.FC<ThemeSkinProps>;
}

export const PortfolioOSRouter: React.FC<PortfolioOSRouterProps> = ({ tier, SkinComponent }) => {
  const location = useLocation();
  const [storeData, setStoreData] = useState(() => getTheme02StoreData());

  // Synchronize data on mount / location change
  useEffect(() => {
    setStoreData(getTheme02StoreData());
  }, [location.pathname]);

  return (
    <SkinComponent
      tier={tier}
      data={storeData}
      onOpenSearch={() => {
        const kEvent = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
        window.dispatchEvent(kEvent);
      }}
    />
  );
};
