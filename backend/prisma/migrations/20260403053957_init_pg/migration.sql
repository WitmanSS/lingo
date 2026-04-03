-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A1', 'A2', 'B1', 'B2');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('MOBILE', 'DESKTOP', 'TABLET');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatar_url" TEXT,
    "bio" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak_days" INTEGER NOT NULL DEFAULT 0,
    "last_active_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "language" TEXT,
    "timezone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" TEXT,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "deviceType" "DeviceType" NOT NULL,
    "device_name" TEXT,
    "os" TEXT,
    "browser" TEXT,
    "ip_address" TEXT,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "difficulty_score" DOUBLE PRECISION,
    "reading_time_minutes" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "cover_image" TEXT,
    "author_id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "is_ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_contents" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "story_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_chapters" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "word_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_tags" (
    "story_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "story_tags_pkey" PRIMARY KEY ("story_id","tag_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_vocabulary" (
    "story_id" TEXT NOT NULL,
    "vocabulary_id" TEXT NOT NULL,

    CONSTRAINT "story_vocabulary_pkey" PRIMARY KEY ("story_id","vocabulary_id")
);

-- CreateTable
CREATE TABLE "story_translations" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "story_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story_audio" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "story_audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_stories" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tokens_used" INTEGER NOT NULL,
    "generation_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "example_sentence" TEXT,
    "phonetic" TEXT,
    "level" "Level" NOT NULL,
    "audio_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_vocabulary" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vocabulary_id" TEXT NOT NULL,
    "learned" BOOLEAN NOT NULL DEFAULT false,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "last_reviewed_at" TIMESTAMP(3),
    "next_review_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "progress_percentage" DOUBLE PRECISION NOT NULL,
    "last_position" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "reading_time_seconds" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review_text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "xp_reward" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "achievement_id" TEXT NOT NULL,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_words_read" INTEGER NOT NULL DEFAULT 0,
    "total_reading_time" INTEGER NOT NULL DEFAULT 0,
    "stories_completed" INTEGER NOT NULL DEFAULT 0,
    "vocabulary_learned" INTEGER NOT NULL DEFAULT 0,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "last_activity_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboards" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "period" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leaderboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "current_period_start" TIMESTAMP(3) NOT NULL,
    "current_period_end" TIMESTAMP(3) NOT NULL,
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "subscription_id" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "payment_method" TEXT NOT NULL,
    "transaction_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "story_id" TEXT,
    "user_id" TEXT,
    "admin_id" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "details" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT,
    "old_values" TEXT,
    "new_values" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "explanation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_options" (
    "id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,

    CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_results" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "answers" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE INDEX "profiles_user_id_idx" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "sessions_token_idx" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "devices_user_id_idx" ON "devices"("user_id");

-- CreateIndex
CREATE INDEX "devices_device_id_idx" ON "devices"("device_id");

-- CreateIndex
CREATE UNIQUE INDEX "stories_slug_key" ON "stories"("slug");

-- CreateIndex
CREATE INDEX "stories_level_idx" ON "stories"("level");

-- CreateIndex
CREATE INDEX "stories_author_id_idx" ON "stories"("author_id");

-- CreateIndex
CREATE INDEX "stories_slug_idx" ON "stories"("slug");

-- CreateIndex
CREATE INDEX "stories_published_idx" ON "stories"("published");

-- CreateIndex
CREATE INDEX "stories_deleted_at_idx" ON "stories"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "story_contents_story_id_key" ON "story_contents"("story_id");

-- CreateIndex
CREATE INDEX "story_contents_story_id_idx" ON "story_contents"("story_id");

-- CreateIndex
CREATE INDEX "story_chapters_story_id_idx" ON "story_chapters"("story_id");

-- CreateIndex
CREATE INDEX "story_chapters_order_idx" ON "story_chapters"("order");

-- CreateIndex
CREATE INDEX "story_tags_story_id_idx" ON "story_tags"("story_id");

-- CreateIndex
CREATE INDEX "story_tags_tag_id_idx" ON "story_tags"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE INDEX "story_vocabulary_story_id_idx" ON "story_vocabulary"("story_id");

-- CreateIndex
CREATE INDEX "story_vocabulary_vocabulary_id_idx" ON "story_vocabulary"("vocabulary_id");

-- CreateIndex
CREATE INDEX "story_translations_story_id_idx" ON "story_translations"("story_id");

-- CreateIndex
CREATE INDEX "story_translations_language_code_idx" ON "story_translations"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "story_audio_story_id_key" ON "story_audio"("story_id");

-- CreateIndex
CREATE INDEX "story_audio_story_id_idx" ON "story_audio"("story_id");

-- CreateIndex
CREATE UNIQUE INDEX "ai_stories_story_id_key" ON "ai_stories"("story_id");

-- CreateIndex
CREATE INDEX "ai_stories_story_id_idx" ON "ai_stories"("story_id");

-- CreateIndex
CREATE INDEX "vocabulary_word_idx" ON "vocabulary"("word");

-- CreateIndex
CREATE INDEX "vocabulary_level_idx" ON "vocabulary"("level");

-- CreateIndex
CREATE INDEX "user_vocabulary_user_id_idx" ON "user_vocabulary"("user_id");

-- CreateIndex
CREATE INDEX "user_vocabulary_vocabulary_id_idx" ON "user_vocabulary"("vocabulary_id");

-- CreateIndex
CREATE INDEX "user_vocabulary_learned_idx" ON "user_vocabulary"("learned");

-- CreateIndex
CREATE INDEX "reading_progress_user_id_idx" ON "reading_progress"("user_id");

-- CreateIndex
CREATE INDEX "reading_progress_story_id_idx" ON "reading_progress"("story_id");

-- CreateIndex
CREATE INDEX "reading_progress_completed_idx" ON "reading_progress"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "reading_progress_user_id_story_id_key" ON "reading_progress"("user_id", "story_id");

-- CreateIndex
CREATE INDEX "bookmarks_user_id_idx" ON "bookmarks"("user_id");

-- CreateIndex
CREATE INDEX "bookmarks_story_id_idx" ON "bookmarks"("story_id");

-- CreateIndex
CREATE INDEX "favorites_user_id_idx" ON "favorites"("user_id");

-- CreateIndex
CREATE INDEX "favorites_story_id_idx" ON "favorites"("story_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_story_id_key" ON "favorites"("user_id", "story_id");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");

-- CreateIndex
CREATE INDEX "notes_story_id_idx" ON "notes"("story_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_story_id_idx" ON "comments"("story_id");

-- CreateIndex
CREATE INDEX "comments_parent_id_idx" ON "comments"("parent_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_story_id_idx" ON "reviews"("story_id");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_story_id_key" ON "reviews"("user_id", "story_id");

-- CreateIndex
CREATE INDEX "ratings_user_id_idx" ON "ratings"("user_id");

-- CreateIndex
CREATE INDEX "ratings_story_id_idx" ON "ratings"("story_id");

-- CreateIndex
CREATE INDEX "ratings_rating_idx" ON "ratings"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_user_id_story_id_key" ON "ratings"("user_id", "story_id");

-- CreateIndex
CREATE INDEX "achievements_category_idx" ON "achievements"("category");

-- CreateIndex
CREATE INDEX "user_achievements_user_id_idx" ON "user_achievements"("user_id");

-- CreateIndex
CREATE INDEX "user_achievements_achievement_id_idx" ON "user_achievements"("achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_user_id_achievement_id_key" ON "user_achievements"("user_id", "achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "reading_stats_user_id_key" ON "reading_stats"("user_id");

-- CreateIndex
CREATE INDEX "reading_stats_user_id_idx" ON "reading_stats"("user_id");

-- CreateIndex
CREATE INDEX "leaderboards_user_id_idx" ON "leaderboards"("user_id");

-- CreateIndex
CREATE INDEX "leaderboards_period_idx" ON "leaderboards"("period");

-- CreateIndex
CREATE INDEX "leaderboards_rank_idx" ON "leaderboards"("rank");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transaction_id_key" ON "payments"("transaction_id");

-- CreateIndex
CREATE INDEX "payments_user_id_idx" ON "payments"("user_id");

-- CreateIndex
CREATE INDEX "payments_subscription_id_idx" ON "payments"("subscription_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "notifications_story_id_idx" ON "notifications"("story_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_admin_id_idx" ON "notifications"("admin_id");

-- CreateIndex
CREATE INDEX "notifications_is_read_idx" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "admin_logs_admin_id_idx" ON "admin_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_logs_entity_type_idx" ON "admin_logs"("entity_type");

-- CreateIndex
CREATE INDEX "admin_logs_entity_id_idx" ON "admin_logs"("entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_idx" ON "audit_logs"("entity_type");

-- CreateIndex
CREATE INDEX "audit_logs_entity_id_idx" ON "audit_logs"("entity_id");

-- CreateIndex
CREATE INDEX "quizzes_story_id_idx" ON "quizzes"("story_id");

-- CreateIndex
CREATE INDEX "quiz_options_quiz_id_idx" ON "quiz_options"("quiz_id");

-- CreateIndex
CREATE INDEX "quiz_results_user_id_idx" ON "quiz_results"("user_id");

-- CreateIndex
CREATE INDEX "quiz_results_quiz_id_idx" ON "quiz_results"("quiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE INDEX "languages_code_idx" ON "languages"("code");

-- CreateIndex
CREATE INDEX "languages_is_active_idx" ON "languages"("is_active");

-- CreateIndex
CREATE INDEX "translations_language_code_idx" ON "translations"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "translations_key_language_code_key" ON "translations"("key", "language_code");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_contents" ADD CONSTRAINT "story_contents_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_chapters" ADD CONSTRAINT "story_chapters_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_tags" ADD CONSTRAINT "story_tags_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_tags" ADD CONSTRAINT "story_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_vocabulary" ADD CONSTRAINT "story_vocabulary_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_vocabulary" ADD CONSTRAINT "story_vocabulary_vocabulary_id_fkey" FOREIGN KEY ("vocabulary_id") REFERENCES "vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_translations" ADD CONSTRAINT "story_translations_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "story_audio" ADD CONSTRAINT "story_audio_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_stories" ADD CONSTRAINT "ai_stories_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vocabulary" ADD CONSTRAINT "user_vocabulary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vocabulary" ADD CONSTRAINT "user_vocabulary_vocabulary_id_fkey" FOREIGN KEY ("vocabulary_id") REFERENCES "vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_stats" ADD CONSTRAINT "reading_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
