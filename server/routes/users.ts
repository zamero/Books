import express from 'express';
import { getUserBooks } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateUserId } from '../middleware/validation.js';

const router = express.Router();

/**
 * @swagger
 * /v1/users/{userId}/books:
 *   get:
 *     summary: Get books rented by a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user's rented books
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       coverImage:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       rentalId:
 *                         type: string
 *                       rentedAt:
 *                         type: string
 *                         format: date-time
 *                       dueDate:
 *                         type: string
 *                         format: date-time
 *                       isOverdue:
 *                         type: boolean
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.get('/:userId/books', authenticateToken, validateUserId, getUserBooks);

export default router;