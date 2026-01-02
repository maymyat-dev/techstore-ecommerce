ALTER TABLE "orders" ADD COLUMN "payment_intent_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_intent_id_unique" UNIQUE("payment_intent_id");