"use client";

import clsx from "clsx";
import Link from "next/link";

import { LinkWithChannel } from "@/components/shop/products/LinkWithChannel";

const NavLink = ({ href, children }: { href: string; children: string }) => {
  const isActive = false;

  return (
    <li className="inline-flex">
      <LinkWithChannel
        href={href}
        className={clsx(
          isActive
            ? "border-neutral-900 text-neutral-900"
            : "border-transparent text-neutral-500",
          "inline-flex items-center border-b-2 pt-px text-sm font-medium hover:text-neutral-700"
        )}
      >
        {children}
      </LinkWithChannel>
    </li>
  );
};

export const NavLinks = () => {
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
      <NavLink href="/shop/products">All products</NavLink>
      {navLinks.menu?.items?.map((item) => {
        if (item.id === "") return null;
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
