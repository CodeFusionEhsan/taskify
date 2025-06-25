-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "by" TEXT,
    "to" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);
