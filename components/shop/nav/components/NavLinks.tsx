import Link from "next/link";

import { NavLink } from "@/components/shop/nav/components/NavLink";

export const NavLinks = async () => {
  const navLinks = {
    menu: {
      items: [
        {
          id: "",
          name: "",
          category: {
            name: "",
            slug: "",
          },
          collection: {
            name: "",
            slug: "",
          },
          page: {
            title: "",
            slug: "",
          },
          url: "",
        },
      ],
    },
  };

  return (
    <>
      <NavLink href="/products">All</NavLink>
      {navLinks.menu?.items?.map((item) => {
        if (item.category) {
          return (
            <NavLink key={item.id} href={`/categories/${item.category.slug}`}>
              {item.category.name}
            </NavLink>
          );
        }
        if (item.collection) {
          return (
            <NavLink
              key={item.id}
              href={`/collections/${item.collection.slug}`}
            >
              {item.collection.name}
            </NavLink>
          );
        }
        if (item.page) {
          return (
            <NavLink key={item.id} href={`/pages/${item.page.slug}`}>
              {item.page.title}
            </NavLink>
          );
        }
        if (item.url) {
          return (
            <Link key={item.id} href={item.url}>
              {item.name}
            </Link>
          );
        }
        return null;
      })}
    </>
  );
};
