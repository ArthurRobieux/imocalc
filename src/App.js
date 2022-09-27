import { useState } from "react";
import "./App.css";

const App = () => {
  const [form, setForm] = useState({
    price: 300000,
    taux: 0.7,
    loyer: 1100,
    years: 25,
  });

  const years = [...Array(form.years)].map((x) => 0);
  const months = [...Array(12)].map((x) => 0);

  let leftPrice = form.price;
  let loanPrice = 0;

  years.forEach((_) => {
    months.forEach((_) => (loanPrice += leftPrice * (form.taux * 0.001)));
    leftPrice -= form.price / form.years;
  });

  loanPrice = Math.round(loanPrice);
  const totalPrice = Math.round(form.price + loanPrice);
  const monthlyPrice = Math.round(totalPrice / 12 / form.years);
  const percentage = ((loanPrice / totalPrice) * 100).toFixed(2);

  return (
    <div class="container">
      <h1>Calculs immobiliers</h1>

      <div>
        <h2>Paramètres</h2>

        <div>
          <div>Prix du bien</div>
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            type="number"
          />
        </div>

        <div>
          <div>Taux d emprunt</div>
          <input
            value={form.taux}
            onChange={(e) => setForm({ ...form, taux: +e.target.value })}
            type="number"
          />
        </div>

        <div>
          <div>Loyer</div>
          <input
            value={form.loyer}
            onChange={(e) => setForm({ ...form, loyer: +e.target.value })}
            type="number"
          />
        </div>

        <div>
          <div>Nombre d années</div>
          <input
            value={form.years}
            onChange={(e) => setForm({ ...form, years: +e.target.value })}
            type="number"
          />
        </div>
      </div>

      <div>
        <h2>Rentabilité</h2>

        <div>{(((form.loyer * 12) / form.price) * 100).toFixed(1)}%</div>
      </div>

      <div>
        <h2>Couts</h2>

        <div>Cout de l emprunt : {loanPrice}</div>
        <div>Cout total : {totalPrice}</div>
        <div>Pourcentage : {percentage}%</div>
        <div>Mensualité : {monthlyPrice}</div>
      </div>
    </div>
  );
};

export default App;
