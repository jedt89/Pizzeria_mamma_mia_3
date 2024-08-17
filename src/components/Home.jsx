import { Header, PizzaCard } from '.';
import pizzas from './models/pizzas';

const Home = ({ setPizzaList, pizzaList, setTotalPrice }) => {
  return (
    <div className='home-container' style={{ marginBottom: '2rem' }}>
      <Header></Header>
      <div className='content-container'>
        <h1 style={{ color: '#fff' }}>Las regalonas de mamá</h1>
        <div className='content'>
          {pizzas.map(({ desc, id, img, ingredients, name, price }, index) => {
            return (
              <PizzaCard
                key={index}
                name={name}
                price={price}
                ingredients={ingredients}
                img={img}
                desc={desc}
                id={id}
                setPizzaList={setPizzaList}
                pizzaList={pizzaList}
                setTotalPrice={setTotalPrice}
              ></PizzaCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
