export const defaultCategory = [
  {
    id: "all",
    name: "Semua Game",
  },
  { id: "popular", name: "Game Popular" },
];

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Mobile Legends",
      item: "https://topupgameku.shop/mobile-legends",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Fire",
      item: "https://topupgameku.shop/free-fire",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PUBG Mobile",
      item: `https://topupgameku.shop/pubg-mobile`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Clash of Clans",
      item: `https://topupgameku.shop/clash-of-clans-id-number`,
    },
  ],
};
