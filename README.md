Framework : Nest.js

Structure : 
*  Api Gateway  
1. Authentication - Authorization Microservice
2. Customer Profile Microservice
3. Product Microservice
4. Cart Micro service

Event Bus - Kafka

For microservice monitoring (Jaeger)-
Copy the entire command and run it in your terminal ->
Service wise tracing will be available in the dashboard.
$ `docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest && open http://localhost:16686`


For microservice eventual logs - 
'logs' Directory
 -> authentication-service -> app.log
 -> customer-service -> app.log
 -> product-service -> app.log
 -> cart-service -> app.log