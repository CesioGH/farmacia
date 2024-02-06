-- CreateTable
CREATE TABLE "users" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "birthAt" DATE NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
