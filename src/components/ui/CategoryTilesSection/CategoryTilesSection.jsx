import clsx from "clsx";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./CategoryTilesSection.module.css";

const CategoryTilesSection = ({
  title,
  items,
  sectionId,
  className,
  linkHref = null,
  linkLabel = "Дивитися все",
}) => {
  const sectionLinkHref = linkHref ?? (sectionId ? `/#${sectionId}` : null);

  const isRouteLink = (href) =>
    typeof href === "string" && href.startsWith("/") && !href.startsWith("/#");

  return (
    <section id={sectionId} className={clsx(styles.section, className)}>
      <Container>
        <SectionHeader
          title={title}
          linkHref={sectionLinkHref}
          linkLabel={linkLabel}
          className={styles.head}
        />

        <div className={styles.grid}>
          {items.map((item) =>
            item.href ? (
              isRouteLink(item.href) ? (
                <Link key={item.id} to={item.href} className={styles.card}>
                  <span className={styles.title}>{item.title}</span>
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                </Link>
              ) : (
                <a key={item.id} href={item.href} className={styles.card}>
                  <span className={styles.title}>{item.title}</span>
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                </a>
              )
            ) : (
              <div key={item.id} className={styles.card} aria-disabled="true">
                <span className={styles.title}>{item.title}</span>
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default CategoryTilesSection;
