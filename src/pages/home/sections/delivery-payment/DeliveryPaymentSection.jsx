import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";

import DeliveryDetailsCard from "./components/DeliveryDetailsCard";
import DeliveryPromoStrip from "./components/DeliveryPromoStrip";
import DeliveryReviewCard from "./components/DeliveryReviewCard";
import styles from "./DeliveryPaymentSection.module.css";

const DeliveryPaymentSection = () => {
  return (
    <section id="delivery-payment" className={styles["delivery-payment"]}>
      <Container>
        <SectionHeader
          title="ДОСТАВКА Й ОПЛАТА"
          linkLabel={null}
          className={styles["delivery-payment-head"]}
        />

        <DeliveryDetailsCard />
        <DeliveryPromoStrip />
        <DeliveryReviewCard />
      </Container>
    </section>
  );
};

export default DeliveryPaymentSection;
