# Blog API

## Project Description

This is a Node.js-based API that serves as a backend for a blog platform. It allows users to sign up, log in, create posts, view all posts, view their own posts, and delete their posts. The API is built using Express.js and MongoDB with Mongoose for data management.

## Features

- **Sign Up**: Allows users to create an account.
- **Login**: Users can log in with their credentials to gain access to protected routes.
- **Create Post**: Authenticated users can create blog posts.
- **View All Posts**: All users can view a list of all blog posts.
- **View My Posts**: Authenticated users can view the blog posts they have authored.
- **Delete My Post**: Authenticated users can delete their own posts.

## Scripts
- yarn : install dependancies
- yarn dev : start development server


## API Response Structure

The API follows a consistent response structure to ensure predictable and easy-to-parse responses. Below is the general response format for both successful and error responses.

### Success Response

A successful response will include:

- `status`: Indicates the success of the operation (typically "success").
- `message`: A short message describing the result.
- `data`: The actual data being returned (can be an object or array depending on the request).
- `meta`: (optional) Metadata related to the data, such as pagination info.

### Error Response

When an error occurs (either due to invalid input, unauthorized access, or other issues), the API returns an error response in a consistent structure. This helps clients understand what went wrong and how to handle the error.

An error response includes:

- `status`: Indicates that the operation failed. Typically set to `"error"` or `"fail"`.
- `message`: A short description of the error.
- `error`: An object containing more details about the error, including error `code`, and any additional `details` that provide context or specific validation errors.