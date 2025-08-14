import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  ip: text("ip").notNull(), // IP address of device
  mac: text("mac").notNull(), // MAC address
  status: boolean("status").default(false).notNull(), // Device status
  location: text("location"), // Optional location
  timestamp: timestamp("timestamp").defaultNow().notNull(), // Record creation time
  cloudinaryUrl: text("cloudinary_url"), // URL of uploaded image
});
