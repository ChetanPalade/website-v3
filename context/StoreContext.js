import { createContext, useEffect, useState } from 'react';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';

export const ProviderContext = createContext();

export const StoreContext = ({ children }) => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isAvailableOpen,
    onOpen: onAvailableOpen,
    onClose: onAvailableClose,
  } = useDisclosure();
  const {
    isOpen: isThanksOpen,
    onOpen: onThanksOpen,
    onClose: onThanksClose,
  } = useDisclosure();
  const [isJoin, setJoin] = useState(false);
  const [price, setPrice] = useState(0);
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [societySuggestion, setSocietySuggestion] = useState([]);
  const [areaSuggestion, setAreaSuggestion] = useState([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (localStorage.getItem('price')) {
      console.log(localStorage.getItem('price'));
    }
    if (sessionStorage.getItem('auth')) {
      console.log(JSON.parse(sessionStorage.getItem('auth')));
      setAuth(JSON.parse(sessionStorage.getItem('auth')));
    }
  }, [price, isAuth]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://yellowsensebackendapi.azurewebsites.net/society_names'
      );
      const data = await response.json();
      console.log(data);
      const response2 = await fetch(
        'https://yellowsensebackendapi.azurewebsites.net/area_names'
      );
      const data2 = await response2.json();
      console.log(data2);
      const suggestionSoc = data.map((loc) => ({
        value: loc.name,
        label: loc.name,
      }));
      const suggestionArea = data2.map((loc) => ({
        value: loc.name,
        label: loc.name,
      }));
      setSocietySuggestion(suggestionSoc);
      setAreaSuggestion(suggestionArea);
    } catch (error) {
      console.log('Area & Society not showing Error', error);
    }
  };

  return (
    <ProviderContext.Provider
      value={{
        price,
        setPrice,
        isLoginOpen,
        onLoginOpen,
        onLoginClose,
        isAvailableOpen,
        onAvailableOpen,
        onAvailableClose,
        isAuth,
        setAuth,
        isThanksOpen,
        onThanksOpen,
        onThanksClose,
        isJoin,
        setJoin,
        isLoading,
        setLoading,
        societySuggestion,
        areaSuggestion,
        isMobile,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
