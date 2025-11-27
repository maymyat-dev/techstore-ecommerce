import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  boolean,
  real,
  serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import { email } from "zod";
import { relations } from "drizzle-orm";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
  role: RoleEnum("roles").default("user").notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const emailVerificationToken = pgTable(
  "emailVerificationToken",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

export const resetPasswordVerificationToken = pgTable(
  "resetPasswordVerificationToke",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

export const twoFactorToken = pgTable(
  "twoFactorToken",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
    userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  },
  (token) => [
    {
      compoundKey: primaryKey({
        columns: [token.id, token.token],
      }),
    },
  ]
);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  title: text("title").notNull(),
  price: real("price").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const productVariants = pgTable("productsVariants", {
  id: serial("id").primaryKey(),
  color: text("color").notNull(),
  productType: text("productType").notNull(),
  updated: timestamp("updated").defaultNow(),
  productId: serial("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const variantImages = pgTable("variantImages", {
  id: serial("id").primaryKey(),
  image_url: text("image_url").notNull(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  order: real("order").notNull(),
  variantId: serial("variantId")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

  export const variantTags = pgTable("variantTags", {
  id: serial("id").primaryKey(),
  tag: text("tag").notNull(),
  variantId: serial("variantId")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

export const productRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants, {
    relationName: "productVariants",
  }),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
      relationName: "product",
    }),
    variantImages: many(variantImages, { relationName: "variantImages" }),
    variantTags: many(variantTags, { relationName: "variantTags" }),
  })
);

export const variantImagesRelations = relations(variantImages, ({ one })=> ({
  productVariant: one(productVariants, {
    fields: [variantImages.variantId],
    references: [productVariants.id],
    relationName: "productVariant",
  })
}))


export const variantTagsRelations = relations(variantTags, ({ one })=> ({
  productVariant
  : one(productVariants, {
    fields: [variantTags.variantId],
    references: [productVariants.id],
    relationName: "productVariant",
  })
}))