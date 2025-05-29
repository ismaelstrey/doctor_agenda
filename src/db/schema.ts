import { relations } from "drizzle-orm";
import { integer, uuid, pgTable, text, timestamp, time, pgEnum, boolean } from "drizzle-orm/pg-core";





// -------------------------------

export const usersTable = pgTable("users", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});


export const sessionTable = pgTable("session", {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' })
});

export const accountTable = pgTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verificationTable = pgTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});



// -------------------------------

export const usersTableRelations = relations(usersTable, ({ many }) => {
    return {
        userToClinic: many(userToClinicTable),
    };
})

export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});



export const userToClinicTable = pgTable("user_to_clinic", {
    userId: text("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const userToClinicTableRelations = relations(userToClinicTable, ({ one }) => {
    return {
        user: one(usersTable, {
            fields: [userToClinicTable.userId],
            references: [usersTable.id],
        }),
        clinic: one(clinicsTable, {
            fields: [userToClinicTable.clinicId],
            references: [clinicsTable.id],
        })
    }
})

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => {
    return {
        doctors: many(doctorsTable),
        patients: many(pattientsTable),
        appointments: many(appointmentsTable),
        userToClinic: many(userToClinicTable),
    };
})

export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
    avatarImageUrl: text("avatar_imageUrl"),
    especiality: text("especiality").notNull(),
    appointmentPriceCents: integer("appointment_price_cents").notNull(),
    availableFromWeekday: integer("available_from_weekday").notNull(),
    availableToWeekday: integer("available_to_weekday").notNull(),
    availableFromTime: time("available_from_time").notNull(),
    availableToTime: time("available_to_time").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const doctorsTableRelations = relations(doctorsTable, ({ one, many }) => {
    return {
        doctor: one(clinicsTable, {
            fields: [doctorsTable.clinicId],
            references: [clinicsTable.id],
        }),
        appointments: many(appointmentsTable),
    };
})


export const patientSexEnum = pgEnum("patient_sex", ["MALE", "FEMALE"]);

export const pattientsTable = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    sex: patientSexEnum("sex").notNull(),
    phoneNumber: text("phone_number").notNull(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const pattientsTableRelations = relations(pattientsTable, ({ one, many }) => {
    return {
        patient: one(clinicsTable, {
            fields: [pattientsTable.clinicId],
            references: [clinicsTable.id],
        }),
        appointments: many(appointmentsTable),
    };
})

export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    date: timestamp("date").notNull(),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }),
    doctorId: uuid("doctor_id").references(() => doctorsTable.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id").references(() => pattientsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
})

export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => {
    return {
        clinic: one(clinicsTable, {
            fields: [appointmentsTable.clinicId],
            references: [clinicsTable.id],
        }),
        doctor: one(doctorsTable, {
            fields: [appointmentsTable.doctorId],
            references: [doctorsTable.id],
        }),
        patient: one(pattientsTable, {
            fields: [appointmentsTable.patientId],
            references: [pattientsTable.id],
        })
    };
})