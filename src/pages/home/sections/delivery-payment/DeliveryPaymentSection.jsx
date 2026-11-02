import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import { deliveryRules } from "@/data/deliveryData";
import { formatMoney } from "@/utils/money";
import { editorialPhotography } from "@/data/marketPhotography";
import styles from "./DeliveryPaymentSection.module.css";
const steps = [
  {
    number: "01",
    title: "Обирайте свій смак",
    text: "Збирайте продукти, готові страви та речі для дому в одному кошику.",
  },
  {
    number: "02",
    title: "Перевірте кошик",
    text: "Кількість, знижки та вартість доставки — усе перед очима.",
  },
  {
    number: "03",
    title: "Залиште час для життя",
    text: "Познайомтеся зі зручним форматом щоденних покупок.",
  },
];
const DeliveryPaymentSection = () => (
  <section id="delivery-payment" className={styles.section}>
    <Container>
      <div className={styles.layout}>
        <div className={styles.visual}>
          <img
            src={editorialPhotography.delivery}
            alt="Продукти в багаторазовій сумці для покупок"
            width="1600"
            height="1067"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Покупки у вашому ритмі</p>
          <h2>
            Просте щодня.
            <br />
            Приємне завжди.
          </h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.terms}>
            <strong>
              Безкоштовна доставка від {formatMoney(deliveryRules.freeFrom)}
            </strong>
            <p>
              Після всіх знижок. Для меншого кошика —{" "}
              {formatMoney(deliveryRules.fee)}.
            </p>
          </div>
          <p className={styles.demo}>
            Urbanfood — навчальний проєкт. Реальні замовлення, доставка та
            оплата поки недоступні.{" "}
            <Link to="/contacts#privacy">Докладніше про демо ↗</Link>
          </p>
        </div>
      </div>
    </Container>
  </section>
);
export default DeliveryPaymentSection;
