import { useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { CartDialog, Footer, Home, Navbar } from './components';
import { navbarItems } from './components/models/menu';
import RegisterDialog from './components/RegisterDialog';

function App() {
  const [registry, setRegistry] = useState(false);
  const [pizzaList, setPizzaList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    onOpen: registerDialogOpen,
    onClose: registerDialogClose,
    isOpen: registerDialogIsOpen
  } = useDisclosure();

  const {
    onOpen: cartOpen,
    onClose: cartClose,
    isOpen: cartIsOpen
  } = useDisclosure();

  const showRegistryModal = (isRegistry) => {
    if (registerDialogIsOpen) return;
    setRegistry(isRegistry);
    registerDialogOpen();
  };

  const disabledButtons = navbarItems
    .map((item) => {
      if (item.key === 'login') item.action = () => showRegistryModal(false);
      if (item.key === 'register') item.action = () => showRegistryModal(true);
      return item;
    })
    .filter((item) =>
      ['login', 'register', 'home'].includes(item.key) ? false : item.disabled
    )
    .map((item) => item.key);

  return (
    <>
      <Navbar
        disabledButtons={disabledButtons}
        items={navbarItems}
        token={false} // La capa de UI no manejará el token, sino que llegará desde otra ubicación AUTH
        total={totalPrice}
        cartOpen={cartOpen}
      />
      <Home
        pizzaList={pizzaList}
        setPizzaList={setPizzaList}
        setTotalPrice={setTotalPrice}
      />
      <RegisterDialog
        isOpen={registerDialogIsOpen} // Este modal está consruido para ser reusable, Registro y Login
        registry={registry}
        setRegistry={setRegistry}
        onClose={registerDialogClose}
      />
      <CartDialog
        cartIsOpen={cartIsOpen}
        cartClose={cartClose}
        pizzaList={pizzaList}
        setPizzaList={setPizzaList}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
      />
      <Footer />
    </>
  );
}

export default App;
