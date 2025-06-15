import express from 'express';
import { getAllBooks, getBookById, rentBook } from '../controllers/bookController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateBookId, validateBookSearch } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Get all books with optional search and filtering
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for title, author, or description
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [relevance, title, author, year, rating]
 *         description: Sort field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', validateBookSearch, getAllBooks);

/**
 * @swagger
 * /v1/books/{bookId}:
 *   get:
 *     summary: Get book details by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:bookId', validateBookId, getBookById);

/**
 * @swagger
 * /v1/books/{bookId}/rent:
 *   post:
 *     summary: Rent a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book rented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Rental'
 *                 message:
 *                   type: string
 *       400:
 *         description: No copies available or already rented
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.post('/:bookId/rent', authenticateToken, validateBookId, rentBook);

export default router;