-- CreateTable
CREATE TABLE "Movie" (
    "movie_id" INTEGER NOT NULL,
    "movie_title" TEXT NOT NULL,
    "genre" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movie_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_movie_id_key" ON "Movie"("movie_id");
