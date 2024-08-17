import { Button } from '@nextui-org/react';
import React from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

const CartPizzaCard = ({
  id,
  img,
  name,
  price,
  quantity,
  total,
  setTotalPrice,
  setPizzaList
}) => {
  const handleChangeQuantity = (operation, id) => {
    setPizzaList((prev) => {
      const updatedPizzas = prev.map((pizza) => {
        if (pizza.id === id) {
          const newQuantity = operation === 'add' 
            ? pizza.quantity + 1 
            : pizza.quantity - 1;
          const newTotal = newQuantity * price;

          return newQuantity > 0
            ? { ...pizza, quantity: newQuantity, total: newTotal }
            : null;
        }
        return pizza;
      }).filter(Boolean);
      setTotalPrice(updatedPizzas.reduce((acc, pizza) => acc + pizza.total, 0));
      return updatedPizzas;
    });
  };

  return (
    <div className='cart-card'>
      <div className='display-flex gap-1rem align-items-center'>
        <img className='border-radius-8' src={img} alt={name} />
        <span>{name}</span>
      </div>

      <div className='flex-column align-items-center'>
        <div className='display-flex justify-center gap-1rem cart-card-buttons'>
          <Button
            variant='ghost'
            color='warning'
            className='head-button'
            onClick={() => handleChangeQuantity('sub', id)}
          >
            <FiMinusCircle color='orange' />
          </Button>

          <Button
            variant='ghost'
            color='warning'
            className='head-button'
            onClick={() => handleChangeQuantity('add', id)}
          >
            <FiPlusCircle color='orange' />
          </Button>
        </div>

        <div className='cart-card-buttons'>
          <span>
            <span className='quantity'>{quantity}</span>
          </span>
          <h2>Total: ${total.toLocaleString('es-CL')}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartPizzaCard;
