import {
  Author,
  Book,
  Category,
  Customer,
  Inventory,
  Invoice,
  Product,
  Revenue,
  User,
} from "@prisma/client";
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
const userData = [
  createUser("Evil Rabbit"),
  createUser("Delba de Oliveira"),
  createUser("Lee Robinson"),
  createUser("Michael Novotny"),
  createUser("Amy Burns"),
  createUser("Balazs Orban"),
];

const createCustomer = (user: User, phoneNumber: string, address: string) => {
  return {
    id: cuid(),
    name: user.name,
    phoneNumber: phoneNumber,
    address: address,
    userId: user.id,
  } as Customer;
};
const customerData = [
  createCustomer(userData[0], "039 123 123", "Dist.1"),
  createCustomer(userData[1], "038 123 123", "Dist.2"),
  createCustomer(userData[2], "037 123 123", "Dist.3"),
  createCustomer(userData[3], "035 123 123", "Dist.4"),
  createCustomer(userData[4], "034 123 123", "Dist.5"),
  createCustomer(userData[5], "033 123 123", "Dist.6"),
];

const createCategory = (name: string, slug: string) => {
  return {
    id: cuid(),
    name: name,
    slug: slug,
  } as Category;
};

const categoryData = [
  createCategory("Self-Help", "self-help"), // 0
  createCategory("Fiction", "fiction"), // 1
  createCategory("History", "history"), // 2
  createCategory("Business & Economics", "business-economics"), // 3
  createCategory("Others", "others"), // 4
];

const createProduct = (
  name: string,
  price: number,
  type: string,
  categoryId: string
) => {
  return {
    id: cuid(),
    name: name,
    price: price,
    type: type === "BOOK" ? "BOOK" : "OTHER",
    categoryId: categoryId,
  } as Product;
};

const productData = [
  createProduct(
    "Les Miserables",
    1820,
    "BOOK",
    categoryData[1].id // fiction
  ),
  createProduct(
    "Sapiens - A brief history of humankind",
    1200,
    "BOOK",
    categoryData[2].id // history
  ),
  createProduct(
    "Sherlock Holmes 1",
    980,
    "BOOK",
    categoryData[1].id // fiction
  ),
  createProduct(
    "The Godfather",
    1920,
    "BOOK",
    categoryData[1].id // fiction
  ),
  createProduct(
    "The rainbow troops",
    760,
    "BOOK",
    categoryData[4].id // other
  ),
  createProduct(
    "Think and grow rich",
    1150,
    "BOOK",
    categoryData[0].id // self-help
  ),
  createProduct(
    "War and peace",
    1540,
    "BOOK",
    categoryData[2].id // history
  ),
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
const authorData = [
  createAuthor("Victor Hugo", "France"), // 0
  createAuthor("Hector Malot", "France"), // 1
  createAuthor("Andrea Hirata", "Indo"), // 2
  createAuthor("Mario Puzo", "USA"), // 3
  createAuthor("Conan Doyle", "Scotland"), // 4
  createAuthor("Yuval Noah Harari", "Israel"), // 5
  createAuthor("Napoleon Hill", "USA"), // 6
  createAuthor("J.K. Rowling", "England"), // 7
  createAuthor("Virginia Woolf", "England"), // 8
  createAuthor("Leo Tolstoy", "Russia"), // 9
  createAuthor("George Orwell", "England"), // 10
  createAuthor("William Shakespeare", "England"), // 11
] as Author[];

const createBook = (
  productId: string,
  title: string,
  authorId: string,
  coverImagePath: string,
  pageCount: number,
  publishedYear: number
) => {
  return {
    productId: productId,
    title: title,
    authorId: authorId,
    description: `This is a brief description for ${title}`,
    coverImagePath: coverImagePath,
    pageCount: pageCount,
    publishedYear: publishedYear,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Book;
};

const bookData = [
  createBook(
    productData[0].id,
    productData[0].name,
    authorData[0].id,
    "/image/books/les-miserables.jpg",
    1462,
    1862
  ),
  createBook(
    productData[1].id,
    productData[1].name,
    authorData[5].id,
    "/image/books/sapiens.jpg",
    628,
    2011
  ),
  createBook(
    productData[2].id,
    productData[2].name,
    authorData[4].id,
    "/image/books/sherlock-holmes-1.jpg",
    636,
    1890
  ),
  createBook(
    productData[3].id,
    productData[3].name,
    authorData[3].id,
    "/image/books/the-godfather.jpg",
    608,
    1969
  ),
  createBook(
    productData[4].id,
    productData[4].name,
    authorData[2].id,
    "/image/books/the-rainbow-troops.jpg",
    304,
    2005
  ),
  createBook(
    productData[5].id,
    productData[5].name,
    authorData[6].id,
    "/image/books/think-and-grow-rich.jpg",
    238,
    1937
  ),
  createBook(
    productData[6].id,
    productData[6].name,
    authorData[9].id,
    "/image/books/war-and-peace.jpg",
    1225,
    1867
  ),
];

const createInventory = (product: Product) => {
  return {
    productId: product.id,
    quantity: 50,
  } as Inventory;
};

const inventoryData = [
  createInventory(productData[0]),
  createInventory(productData[1]),
  createInventory(productData[2]),
  createInventory(productData[3]),
  createInventory(productData[4]),
  createInventory(productData[5]),
  createInventory(productData[6]),
];

const createInvoice = (
  amount: number,
  status: string,
  date: string,
  customerId: string
) => {
  return {
    id: cuid(),
    amount: amount,
    status: status === "PENDING" ? "PENDING" : "PAID",
    paymentMethod: status === "PENDING" ? "CREDIT" : "CASH",
    date: date,
    customerId: customerId,
    createdAt: new Date(),
    updatedAt: new Date(),
    otherDescription: null,
  } as Invoice;
};
const invoiceData = [
  createInvoice(
    2 * (productData[0].price ?? 1000),
    "PENDING",
    "2024-12-06",
    customerData[0].id
  ),
  createInvoice(
    2 * (productData[1].price ?? 1000),
    "PENDING",
    "2024-11-14",
    customerData[1].id
  ),
  createInvoice(
    1 * (productData[2].price ?? 1000),
    "PAID",
    "2024-10-29",
    customerData[4].id
  ),
  createInvoice(
    3 * (productData[3].price ?? 1000),
    "PAID",
    "2024-09-10",
    customerData[3].id
  ),
  createInvoice(
    1 * (productData[4].price ?? 1000),
    "PENDING",
    "2024-08-05",
    customerData[5].id
  ),
  createInvoice(
    2 * (productData[5].price ?? 1000),
    "PENDING",
    "2024-07-16",
    customerData[2].id
  ),
  createInvoice(
    2 * (productData[0].price ?? 1000),
    "PENDING",
    "2024-06-27",
    customerData[0].id
  ),
  createInvoice(
    1 * (productData[2].price ?? 1000),
    "PAID",
    "2024-06-09",
    customerData[3].id
  ),
  createInvoice(
    1 * (productData[4].price ?? 1000),
    "PAID",
    "2024-06-17",
    customerData[4].id
  ),
  createInvoice(
    2 * (productData[3].price ?? 1000),
    "PAID",
    "2024-06-07",
    customerData[5].id
  ),
  createInvoice(
    2 * (productData[4].price ?? 1000),
    "PAID",
    "2024-08-19",
    customerData[1].id
  ),
  createInvoice(
    3 * (productData[5].price ?? 1000),
    "PAID",
    "2024-06-03",
    customerData[5].id
  ),
  createInvoice(
    3 * (productData[2].price ?? 1000),
    "PAID",
    "2024-06-05",
    customerData[2].id
  ),
];

const createRevenue = (period: string, revenue: number) => {
  return {
    id: cuid(),
    period: period,
    revenue: revenue,
    userId: userData[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Revenue;
};
const revenueData = [
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

export {
  authorData,
  bookData,
  categoryData,
  customerData,
  inventoryData,
  invoiceData,
  productData,
  revenueData,
  userData,
};
