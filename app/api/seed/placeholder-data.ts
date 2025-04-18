import { Author, Invoice, Revenue, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import cuid from "cuid";

const hashedPassword = await bcrypt.hash("siu", 10);
const createUser = (name: string) => {
  return {
    id: cuid(),
    name: name,
    email: `${name.toLowerCase().replaceAll(" ", "-")}@email.com`,
    image: `/image/users/${name.toLowerCase().replaceAll(" ", "-")}.png`,
    password: hashedPassword,
    isTwoFactorEnabled: false,
    role: "USER",
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;
};
const users = [
  createUser("Evil Rabbit"),
  createUser("Delba de Oliveira"),
  createUser("Lee Robinson"),
  createUser("Michael Novotny"),
  createUser("Amy Burns"),
  createUser("Balazs Orban"),
];

const createInvoice = (
  amount: number,
  status: string,
  date: string,
  userId: string
) => {
  return {
    id: cuid(),
    amount: amount,
    status: status === "PENDING" ? "PENDING" : "PAID",
    paymentMethod: "CASH",
    date: date,
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    otherDescription: null,
  } as Invoice;
};
const invoices = [
  createInvoice(15795, "PENDING", "2024-12-06", users[0].id),
  createInvoice(20348, "PENDING", "2024-11-14", users[1].id),
  createInvoice(3040, "PAID", "2024-10-29", users[4].id),
  createInvoice(44800, "PAID", "2024-09-10", users[3].id),
  createInvoice(34577, "PENDING", "2024-08-05", users[5].id),
  createInvoice(54246, "PENDING", "2024-07-16", users[2].id),
  createInvoice(666, "PENDING", "2024-06-27", users[0].id),
  createInvoice(32545, "PAID", "2024-06-09", users[3].id),
  createInvoice(1250, "PAID", "2024-06-17", users[4].id),
  createInvoice(8546, "PAID", "2024-06-07", users[5].id),
  createInvoice(500, "PAID", "2024-08-19", users[1].id),
  createInvoice(8945, "PAID", "2024-06-03", users[5].id),
  createInvoice(1000, "PAID", "2024-06-05", users[2].id),
];

const createRevenue = (period: string, revenue: number) => {
  return {
    id: cuid(),
    period: period,
    revenue: revenue,
    userId: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Revenue;
};
const revenue = [
  createRevenue("Jan", 3200),
  createRevenue("Feb", 2800),
  createRevenue("Mar", 2200),
  createRevenue("Apr", 1500),
  createRevenue("May", 1200),
  createRevenue("Jun", 3500),
  createRevenue("Jul", 3700),
  createRevenue("Aug", 2500),
  createRevenue("Sep", 2800),
  createRevenue("Oct", 3000),
  createRevenue("Nov", 3800),
  createRevenue("Dec", 4900),
];

const createAuthor = (name: string, nationality: string) => {
  return {
    id: cuid(),
    name: name,
    nationality: nationality,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Author;
};
const authors = [
  createAuthor("Victor Hugo", "France"),
  createAuthor("Hector Malot", "France"),
  createAuthor("Andrea Hirata", "Indo"),
  createAuthor("Nguyen Nhat Anh", "Vietnam"),
  createAuthor("Conan Doyle", "Scotland"),
  createAuthor("Yuval Noah Harari", "Israel"),
  createAuthor("Napoleon Hill", "USA"),
  createAuthor("J.K. Rowling", "England"),
  createAuthor("Virginia Woolf", "England"),
  createAuthor("Leo Tolstoy", "Russia"),
  createAuthor("George Orwell", "England"),
  createAuthor("William Shakespeare", "England"),
] as Author[];

export { users, invoices, revenue, authors };
