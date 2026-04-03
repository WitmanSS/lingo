-- CreateTable
CREATE TABLE "level_table" (
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "xp_required" INTEGER NOT NULL,
    "icon_url" TEXT,
    "description" TEXT,

    CONSTRAINT "level_table_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "xp_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xp_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_warnings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_warnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_blocks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_reports" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "reporter_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "xp_logs_user_id_idx" ON "xp_logs"("user_id");

-- CreateIndex
CREATE INDEX "user_warnings_user_id_idx" ON "user_warnings"("user_id");

-- CreateIndex
CREATE INDEX "user_warnings_admin_id_idx" ON "user_warnings"("admin_id");

-- CreateIndex
CREATE INDEX "user_blocks_user_id_idx" ON "user_blocks"("user_id");

-- CreateIndex
CREATE INDEX "user_blocks_admin_id_idx" ON "user_blocks"("admin_id");

-- CreateIndex
CREATE INDEX "story_reports_story_id_idx" ON "story_reports"("story_id");

-- CreateIndex
CREATE INDEX "story_reports_reporter_id_idx" ON "story_reports"("reporter_id");

-- AddForeignKey
ALTER TABLE "xp_logs" ADD CONSTRAINT "xp_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_warnings" ADD CONSTRAINT "user_warnings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_blocks" ADD CONSTRAINT "user_blocks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_reports" ADD CONSTRAINT "story_reports_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_reports" ADD CONSTRAINT "story_reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
