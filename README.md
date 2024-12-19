# Blog Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
    - [Backend (blog-app)](#backend-blog-app)
- [API Details](#api-details)
- [Learning Objectives](#learning-objectives)
- [License](#license)

[//]: # (- [Getting Started](#getting-started))

[//]: # (- [Contributors](#contributors))

[//]: # (- [Acknowledgments](#acknowledgments))

## Overview

The **Blog Application** is a full-featured platform built using the MEN (MongoDB, Express.js, Node.js) stack. It enables users to register, create blog posts, edit posts, read others' posts, and like posts. This application offers a seamless blogging experience with secure authentication and responsive design.

## Features

- **User Registration**: Users can register for a new account.
- **User Authentication**: Secure login using JWT tokens.
- **Create Blog Posts**: Authenticated users can create new blog posts.
- **Edit & Delete Posts**: Users can update or delete their own posts.
- **Read Posts**: View posts created by other users.
- **Like Posts**: Like and engage with blog posts.
- **Responsive Design**: The interface adapts to mobile, tablet, and desktop devices.

## Technologies Used

### Backend (blog-app)

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user data and blog posts.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **bcrypt**: For password hashing.
- **cors**: Middleware for handling cross-origin requests.

## API Details

### Posts API

| Method | Endpoint                     | Description                          | Authentication |
|--------|------------------------------|--------------------------------------|----------------|
| `GET`  | `/posts/search`              | Search for posts                     | No             |
| `GET`  | `/posts`                     | Get all posts                        | No             |
| `GET`  | `/posts/:id`                 | Get a single post by ID              | No             |
| `POST` | `/posts`                     | Create a new post                    | Yes            |
| `PATCH`| `/posts/:id`                 | Update a post by ID                  | Yes            |
| `DELETE`| `/posts/:id`                | Delete a post by ID                  | Yes            |
| `PATCH`| `/posts/:id/likePost`        | Like a post                          | Yes            |
| `POST` | `/posts/:id/commentPost`     | Comment on a post                    | Yes            |

### User Authentication API

| Method | Endpoint       | Description                 | Authentication |
|--------|----------------|-----------------------------|----------------|
| `POST` | `/users/signin`| Sign in an existing user    | No             |
| `POST` | `/users/signup`| Register a new user         | No             |

## Learning Objectives

- Understand how to build a full-stack web application using the MEN stack.
- Learn to implement secure user authentication with JWT.
- Gain experience with RESTful API design and development.
- Manage CRUD operations for blog posts.
- Enhance skills in MongoDB for handling data storage and retrieval.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
