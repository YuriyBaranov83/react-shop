import clsx from "clsx";

import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./CategoryTilesSection.module.css";

const CategoryTilesSection = ({
  title,
  items,
  className,
  linkHref = "#",
  linkLabel = "Дивитися все",
}) => {
  return (
    <section className={clsx(styles.section, className)}>
      <Container>
        <SectionHeader
          title={title}
          linkHref={linkHref}
          linkLabel={linkLabel}
          className={styles.head}
        />

        <div className={styles.grid}>
          {items.map((item) => (
            <a key={item.id} href={item.href ?? "#"} className={styles.card}>
              <span className={styles.title}>{item.title}</span>
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryTilesSection;
