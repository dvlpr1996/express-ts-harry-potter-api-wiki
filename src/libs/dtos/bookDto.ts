import { Book } from '@prisma/client';

const bookDto = (book: Book) => ({
  id: book.id,
  title: book.title,
  slug: book.slug,
  author: book.author,
  language: book.language,
  genre: book.genre,
  type: book.type,
  country: book.country,
  seriesNumber: book.seriesNumber,
  isbn: book.isbn,
  pages: book.pages,
  ukPublishDate: book.ukPublishDate,
  usPublishDate: book.usPublishDate,
  coverPath: book.coverPath,
  bookInfoUrl: book.bookInfoUrl,
  summary: book.summary,
  createdAt: book.createdAt.toLocaleDateString(),
  updatedAt: book.updatedAt.toLocaleDateString(),
});

export default bookDto
