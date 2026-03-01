import Container from "@/components/layout/Container";
import ukraineCoverageMapImage from "@/assets/images/contacts/delivery-map.webp";
import styles from "./ContactsPage.module.css";

const stores = [
  {
    id: "kyiv-center",
    title: "Urbanfood Супермаркет",
    address: "м. Київ, вул. Антоновича, 12",
    hours: "08:00 - 22:00",
  },
  {
    id: "kyiv-west",
    title: "Urbanfood Супермаркет",
    address: "м. Київ, просп. Берестейський, 67",
    hours: "08:00 - 22:00",
  },
  {
    id: "lviv",
    title: "Urbanfood Супермаркет",
    address: "м. Львів, вул. Героїв УПА, 72",
    hours: "08:00 - 21:30",
  },
  {
    id: "odesa",
    title: "Urbanfood Супермаркет",
    address: "м. Одеса, вул. Канатна, 28",
    hours: "08:00 - 22:00",
  },
  {
    id: "dnipro",
    title: "Urbanfood Супермаркет",
    address: "м. Дніпро, просп. Дмитра Яворницького, 54",
    hours: "08:00 - 22:00",
  },
  {
    id: "vinnytsia",
    title: "Urbanfood Супермаркет",
    address: "м. Вінниця, вул. Соборна, 41",
    hours: "08:00 - 21:00",
  },
  {
    id: "ivano-frankivsk",
    title: "Urbanfood Супермаркет",
    address: "м. Івано-Франківськ, вул. Незалежності, 36",
    hours: "08:00 - 21:00",
  },
  {
    id: "ternopil",
    title: "Urbanfood Супермаркет",
    address: "м. Тернопіль, вул. Руська, 18",
    hours: "08:00 - 21:00",
  },
];

const ContactsPage = () => {
  return (
    <section className={styles["contacts-section"]}>
      <Container>
          <h1>Контакти</h1>
          <p className={styles["contacts-lead"]}>
            Urbanfood - мережа магазинів та кулінарії. Працюємо в межах України та оперативно
            обробляємо звернення клієнтів.
          </p>

          <div className={styles["contacts-meta-grid"]}>
            <article className={styles["contacts-card"]}>
              <h2>Графік підтримки</h2>
              <p>Щоденно з 08:00 до 21:00</p>
              <p>Без вихідних</p>
            </article>

            <article className={styles["contacts-card"]}>
              <h2>Зв&apos;язок</h2>
              <div className={styles["contacts-link-list"]}>
                <a className={styles["contacts-link"]} href="tel:+38000490999">
                  <span className={styles["contacts-link-label"]}>Телефон:</span> +38 (000) 49-09-99
                </a>
                <a className={styles["contacts-link"]} href="mailto:contact@urbanfood.ua">
                  <span className={styles["contacts-link-label"]}>Email:</span> contact@urbanfood.ua
                </a>
                <a className={styles["contacts-link"]} href="mailto:feedback@urbanfood.ua">
                  <span className={styles["contacts-link-label"]}>Відгуки:</span> feedback@urbanfood.ua
                </a>
              </div>
            </article>
          </div>

          <figure className={styles["contacts-map-card"]}>
            <img
              src={ukraineCoverageMapImage}
              alt="Карта покриття Urbanfood на території України"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Покриття Urbanfood виключно на території України.</figcaption>
          </figure>

          <h2 className={styles["contacts-stores-title"]}>Магазини Urbanfood в Україні</h2>
          <div className={styles["contacts-stores-grid"]}>
            {stores.map((store) => (
              <article key={store.id} className={styles["contacts-store-card"]}>
                <h3>{store.title}</h3>
                <p>{store.address}</p>
                <p>{store.hours}</p>
              </article>
            ))}
          </div>
      </Container>
    </section>
  );
};

export default ContactsPage;
