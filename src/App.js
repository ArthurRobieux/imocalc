import { useState } from "react";
import "./App.css";

const App = () => {
  const startPrice = 300000;

  const [form, setForm] = useState({
    price: startPrice,
    taux: 0.7,
    loyer: 1100,
    years: 25,
    fraisNotaire: startPrice * 0.08,
    fraisCourtier: 0,
    fraisGarantie: startPrice * 0.0092,
    apport: 0,
    charges: 0,
    salaireFoyer: 3000,
    chargeMensuelle: 150,
  });

  const years = [...Array(form.years)].map((x) => 0);
  const months = [...Array(12)].map((x) => 0);

  let leftPrice = form.price;
  let bankInterestPrice = 0;
  let tauxImprevu = 1.15;

  years.forEach((_) => {
    months.forEach(
      (_) => (bankInterestPrice += leftPrice * (form.taux * 0.001))
    );
    leftPrice -= form.price / form.years;
  });

  bankInterestPrice = Math.round(bankInterestPrice);
  const loanPrice = Math.round(
    form.price +
      form.fraisGarantie +
      form.fraisNotaire +
      form.fraisCourtier -
      form.apport
  );
  const totalPrice = Math.round(bankInterestPrice + loanPrice);
  const percentage = ((bankInterestPrice / totalPrice) * 100).toFixed(2);
  const monthlyPrice = Math.round(totalPrice / 12 / form.years);
  const monthlyPriceLoan = Math.round(loanPrice / (12 * form.years));
  const monthlyPriceJonathan = Math.round(
    monthlyPriceLoan + form.chargeMensuelle
  );

  return (
    <div class="container">
      <h1>Calculs immobiliers</h1>

      <div class="investissement-list-grid">
        <div class="investissement-locatif">
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

          <div>
            <h2>Rentabilité</h2>

            <div>{(((form.loyer * 12) / form.price) * 100).toFixed(1)}%</div>
          </div>

          <div>
            <h2>Couts</h2>

            <div>Cout de l emprunt : {bankInterestPrice}</div>
            <div>Cout total : {totalPrice}</div>
            <div>Pourcentage : {percentage}%</div>
            <div>Mensualité : {monthlyPrice}</div>
          </div>
        </div>
        <div class="investissement-residence-principale">
          <h2>Paramètres d'achat de la résidence</h2>

          <div>
            <div>Prix du bien</div>
            <input
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  fraisNotaire: +e.target.value * 0.08,
                  price: +e.target.value,
                  fraisGarantie: +e.target.value * 0.0092,
                })
              }
              type="number"
            />
          </div>

          <div>
            <div>Frais de notaire estimés</div>
            <div> {form.fraisNotaire}</div>
          </div>
          <div>
            <div>Frais de garantie estimés</div>
            <div> {form.fraisGarantie}</div>
          </div>
          <div>
            <div>Charges mensuelles</div>
            <input
              value={form.chargeMensuelle}
              onChange={(e) =>
                setForm({ ...form, chargeMensuelle: +e.target.value })
              }
              type="number"
            />
          </div>
          <div>
            <div>Frais de courtier (facultatif)</div>
            <input
              value={form.fraisCourtier}
              onChange={(e) =>
                setForm({ ...form, fraisCourtier: +e.target.value })
              }
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
            <div>Nombre d années</div>
            <input
              value={form.years}
              onChange={(e) => setForm({ ...form, years: +e.target.value })}
              type="number"
            />
          </div>
          <div>
            <div>Apport personnel</div>
            <input
              value={form.apport}
              onChange={(e) => setForm({ ...form, apport: +e.target.value })}
              type="number"
            />
          </div>
          <div>
            <div>Salaire du foyer</div>
            <input
              value={form.salaireFoyer}
              onChange={(e) =>
                setForm({ ...form, salaireFoyer: +e.target.value })
              }
              type="number"
            />
          </div>
          <div>
            <h2>Couts</h2>

            <div>Cout de l emprunt : {loanPrice} </div>
            <div>
              Cout total (sur {form.years} ans, sans remboursement anticipé) :{" "}
              {totalPrice} e
            </div>
            <div>Mensualités crédit estimées :{monthlyPriceLoan} e</div>
            <div>
              Taux d'endettement:
              {(100 / (form.salaireFoyer / monthlyPriceLoan)).toFixed(1)} %
            </div>
            <div>
              Mensualités estimées (avec charges) :{monthlyPriceJonathan} e
            </div>
            <div>
              Mensualités dans la vraie vie :
              {(monthlyPriceJonathan * tauxImprevu).toFixed(0)} e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
