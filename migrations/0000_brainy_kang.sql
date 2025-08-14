CREATE TABLE "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"mac" text NOT NULL,
	"status" boolean DEFAULT false NOT NULL,
	"location" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"cloudinary_url" text
);
