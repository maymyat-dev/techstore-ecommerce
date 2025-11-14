CREATE TABLE "twoFactorToken" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userId" text
);
--> statement-breakpoint
ALTER TABLE "twoFactorToken" ADD CONSTRAINT "twoFactorToken_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;