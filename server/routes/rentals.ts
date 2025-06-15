import express from 'express';
import { returnBook, rentBook } from '../controllers/rentalController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRentalId } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * /v1/rentals/{rentalId}/return:
 *   post:
 *     summary: Return a rented book
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rentalId
 *         required: true
 *         schema:
 *           type: string
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Book returned successfully
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
 *         description: Book already returned
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Rental not found
 */
router.post('/:rentalId/return', authenticateToken, validateRentalId, returnBook);

/**
 * @swagger
 * /v1/rentals:
 *   post:
 *     summary: Rent a book
 *     tags: [Rentals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to rent
 *               userId:
 *                 type: string
 *                 description: (Optional) The ID of the user renting the book. If not provided, defaults to the authenticated user's ID.
 *     responses:
 *       201:
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
 *         description: Invalid input or book unavailable
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Book not found
 *       409:
 *         description: Book already rented by user
 */
router.post('/', authenticateToken, rentBook);

export default router;