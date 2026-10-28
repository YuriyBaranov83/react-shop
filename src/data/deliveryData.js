export const deliveryRules = {
  freeFrom: 30000,
  fee: 5000,
  hours: "07:00–23:00",
  zones: "ЖК «Варшавський Плюс» і ЖК «Файна Таун», Київ",
};

export const deliveryDetails = [
  { title: "Зони доставки (демо)", lines: [deliveryRules.zones] },
  { title: deliveryRules.hours, lines: ["Демонстраційний графік приймання замовлень. Фактичний час доставки не бронюється."] },
  { title: `${deliveryRules.freeFrom / 100} грн`, lines: ["Мінімальна сума безкоштовної доставки після всіх знижок.", `Інакше доставка коштує ${deliveryRules.fee / 100} грн.`] },
  { title: "Оплата (демо)", lines: ["Можна перевірити кошик і промокоди. Замовлення та платежі не здійснюються."] },
];
