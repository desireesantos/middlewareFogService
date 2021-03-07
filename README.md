# middlewareFogService

Middleware Fog Service is a interface responsible for decaple the input protocol( message from edge device) and output protocol( message from fog to cloud). The goal is to achieve a stable performance even with congested network.

This service receives 2 main informations.

- Payload - It represents the data from the smart objects(Edge device).
- Protocol - It represents the best protocol based on network conditions. The valid IoT protocols are:
  - MQTT
  - CoAP
  - AMPQ
  - DDS
  - HTTP/2
