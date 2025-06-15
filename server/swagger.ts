import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'A comprehensive API for managing library books, users, and rentals',
      contact: {
        name: 'Library Management System',
        email: 'admin@library.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the book'
            },
            title: {
              type: 'string',
              description: 'Title of the book'
            },
            author: {
              type: 'string',
              description: 'Author of the book'
            },
            isbn: {
              type: 'string',
              description: 'ISBN number'
            },
            genre: {
              type: 'string',
              description: 'Genre of the book'
            },
            description: {
              type: 'string',
              description: 'Description of the book'
            },
            coverImage: {
              type: 'string',
              description: 'URL to the book cover image'
            },
            publishedYear: {
              type: 'integer',
              description: 'Year the book was published'
            },
            totalCopies: {
              type: 'integer',
              description: 'Total number of copies available'
            },
            availableCopies: {
              type: 'integer',
              description: 'Number of copies currently available'
            },
            rating: {
              type: 'number',
              description: 'Average rating of the book'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tags associated with the book'
            }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date'
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the user account is active'
            }
          }
        },
        Rental: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the rental'
            },
            bookId: {
              type: 'string',
              description: 'ID of the rented book'
            },
            userId: {
              type: 'string',
              description: 'ID of the user who rented the book'
            },
            rentedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the book was rented'
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Due date for returning the book'
            },
            returnedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the book was returned'
            },
            isReturned: {
              type: 'boolean',
              description: 'Whether the book has been returned'
            },
            lateFee: {
              type: 'number',
              description: 'Late fee charged if returned after due date'
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              description: 'Current page number'
            },
            limit: {
              type: 'integer',
              description: 'Number of items per page'
            },
            total: {
              type: 'integer',
              description: 'Total number of items'
            },
            totalPages: {
              type: 'integer',
              description: 'Total number of pages'
            }
          }
        }
      }
    }
  },
  apis: ['./server/routes/*.ts']
};

export const specs = swaggerJsdoc(options);