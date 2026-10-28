import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import deliveryIllustration from "@/assets/images/contacts/delivery-map.webp";
import { shopInfo, stores } from "@/data/shopInfoData";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => (
  <section className={`${styles["contacts-main"]} ${styles["contacts-section"]}`}>
    <Container>
      <h1>Контакти</h1>
      <p className={styles["contacts-lead"]}>Urbanfood — демонстраційний онлайн-супермаркет. Адреси та контакти наведено для прикладу; замовлення й звернення не приймаються.</p>
      <div className={styles["contacts-meta-grid"]}>
        <article className={styles["contacts-card"]}>
          <h2>Графік підтримки (демо)</h2><p>{shopInfo.supportHours}</p><p>Без вихідних</p>
        </article>
        <article className={styles["contacts-card"]}>
          <h2>Демонстраційні контакти</h2>
          <div className={styles["contacts-link-list"]}>
            <p><span className={styles["contacts-link-label"]}>Телефон:</span> буде додано перед запуском</p>
            <p><span className={styles["contacts-link-label"]}>Email:</span> {shopInfo.email}</p>
            <p><span className={styles["contacts-link-label"]}>Відгуки:</span> {shopInfo.feedbackEmail}</p>
          </div>
        </article>
      </div>
      <figure className={styles["contacts-map-card"]}>
        <img src={deliveryIllustration} alt="Ілюстрація кур'єрської доставки продуктів" width="1080" height="500" loading="lazy" decoding="async" />
        <figcaption>Ілюстрація доставки. <Link to="/#delivery-payment" className={styles["contacts-link"]}>Переглянути демонстраційні умови</Link></figcaption>
      </figure>
      <h2 className={styles["contacts-stores-title"]}>Приклади магазинів в Україні</h2>
      <div className={styles["contacts-stores-grid"]}>
        {stores.map((store) => <article key={store.id} className={styles["contacts-store-card"]}>
          <h3>{store.title}</h3><p>{store.address}</p><p>{store.hours}</p>
        </article>)}
      </div>
      <section id="privacy" className={styles["privacy-section"]} aria-labelledby="privacy-title">
        <h2 id="privacy-title">Конфіденційність у демо-версії</h2>
        <p>Кошик та обране зберігаються у вашому браузері. Їх можна очистити, видаливши товари або дані цього сайту.</p>
        <p>Форми перевіряють введення локально. Повідомлення, заявки, підписки й SMS не надсилаються, облікові записи не створюються. Для перевірки використовуйте вигадані дані.</p>
        <p>Реальні умови користування та політику обробки даних буде опубліковано перед запуском сервісу.</p>
      </section>
    </Container>
  </section>
);
export default ContactsPage;
