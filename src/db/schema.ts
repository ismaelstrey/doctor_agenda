import { relations } from "drizzle-orm";
import { integer, uuid, pgTable, text, timestamp, time, pgEnum } from "drizzle-orm/pg-core";




export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
});

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
    userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
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