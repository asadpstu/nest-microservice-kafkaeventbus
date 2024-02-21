# Microservices Architecture with Nest.js

This project implements a microservices architecture using the Nest.js framework. It consists of several microservices orchestrated together through an API Gateway and utilizes Kafka as an event bus. Each microservice is responsible for a specific domain, such as authentication, customer profiles, products, and cart management.

## Project Structure

- **Api Gateway**: Entry point for external clients to interact with the microservices.
- **Authentication - Authorization Microservice**: Handles user authentication and authorization.
- **Customer Profile Microservice**: Manages customer profiles and related operations.
- **Product Microservice**: Deals with product-related functionalities.
- **Cart Microservice**: Manages shopping cart operations.
- **Event Bus - Kafka**: Facilitates communication between microservices via a publish-subscribe model.

## Monitoring with Jaeger

For monitoring microservices, Jaeger is utilized for tracing. To set up Jaeger, execute the following command:

```bash
docker run -d \
    -p 5775:5775/udp \
    -p 6831:6831/udp \
    -p 6832:6832/udp \
    -p 5778:5778 \
    -p 16686:16686 \
    -p 14268:14268 \
    jaegertracing/all-in-one:latest && open http://localhost:16686


# Microservice Eventual Logs

This repository contains logs for various microservices in the system.

## Directory Structure

logs/
│
├── authentication-service/
│ └── app.log
│
├── customer-service/
│ └── app.log
│
├── product-service/
│ └── app.log
│
└── cart-service/
└── app.log

### Description

- **authentication-service**: Logs related to the authentication microservice.
- **customer-service**: Logs related to the customer microservice.
- **product-service**: Logs related to the product microservice.
- **cart-service**: Logs related to the shopping cart microservice.

## Usage

You can navigate to each service directory to access its respective log file. These logs can be useful for debugging, monitoring, and analyzing the behavior of individual microservices.

