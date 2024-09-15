# Balance Sheet Report Application

Simple one-page application to display the Balance Sheet Report from Xero.

## Overview

The application is divided into two main components:
1. **Backend**: Provides the API endpoint to fetch data from Xero image.
2. **Frontend**: Displays in a table the Balance Sheet data got via backend.

## Xero API Image

It is using a mock Xero Balance Sheet API Docker image which was the data source:
[https://hub.docker.com/r/jaypeng2015/show-me-the-money](https://hub.docker.com/r/jaypeng2015/show-me-the-money)

### Built With

* [![Typescript][Typescript.org]][Typescript-url]
* [![React][React.js]][React-url]
* [![Tailwindcss][Tailwindcss.com]][Tailwindcss-url]
* [![Jest][Jest.io]][Jest-url]
* [![Fastapi][Fastapi.com]][Fastapi-url]
* [![Pytest][Pytest.org]][Pytest-url]

## Project Structure ##

The system consists of the following:

### Backend Image
- **Stack**: Python FastAPI + Pytest
- **Port**: Backend runs on port `8000:8000`.
- **End point**: `/balancesheet`
- **Authentication**: It was assumed that authentication with Xero is already done.
- **Error Handling**: The backend includes error handling for edge cases.
- **Main Directories**: app/ and tests/
- **Depends on**: jaypeng2015/show-me-the-money

### Frontend Image
- **Stack**: TypeScript + React + Jest + Tailwind
- **Port**: Frontend runs on port `5000:80`.
- **Display**: Displays the Balance Sheet data fetched from the backend API in a table format.
- **Main Directories**: app/, public/, src/ and tests/

### Containerization
Both backend and frontend are containerized using Docker, with appropriate Dockerfiles for each service. The `docker-compose.yml` file is used to orchestrate both services.

## Running the Application

### Prerequisites

Make sure you have Docker installed on your machine. If not, follow the [Docker installation guide](https://docs.docker.com/get-docker/).

### Steps to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/renanrcrr/show-me-the-money.git
   cd show-me-the-money

2. To build the images for both the backend and frontend: 
    ```bash
    docker-compose build

3. Run the containers with: 
    ```bash
    docker-compose up

4. Access the browser through different ports:
    ```bash
    - http://localhost:3000/api.xro/2.0/Reports/BalanceSheet
    - http://localhost:8000/balancesheet
    - http://localhost:5000/

### 1 - Judging Criteria : Backend Features ###

- **Brevity and Simplicity**: 
- [ ] Reason 1: The code is concise and straightforward, without unnecessary complexity. The implementation of the /balancesheet endpoint is simple and effective, handling potential exceptions (such as errors from the external API) clearly and directly with the use of specific HTTP exceptions.
- [ ] Reason 2: The simplicity in using FastAPI, a lightweight and efficient framework, and the use of httpx for HTTP calls reinforce the concept of simplicity and modularity. Additionally, the Dockerfile is minimalistic, containing only what is necessary to run the application.

- **Engineering principles & standards**: 
- [ ] Reason 1: The project follows good clean code practices, with a clear separation of responsibilities between the FastAPI code and the tests. The use of httpx.AsyncClient to perform asynchronous calls to the Xero API is an appropriate choice for handling I/O-bound operations.
- [ ] Reason 2: The implementation of the CORS middleware allows the frontend (React) to interact with the backend, reflecting consideration for system integration.
- [ ] Reason 3: The project utilizes a Dockerfile, indicating a concern for standardizing the execution environment and ensuring system portability.

- **System extensibility & Scalability**:
- [ ] Reason 1: The modular architecture of FastAPI facilitates extensibility. New endpoints or features can easily be added without affecting the existing structure.
- [ ] Reason 2: The use of httpx.AsyncClient is a scalable approach since asynchronous operations allow the server to handle multiple requests concurrently without blocking threads, which is crucial for systems that need to scale efficiently.
- [ ] Reason 3: The Docker structure facilitates deployment in clusters or cloud platforms, enhancing horizontal scalability.

- **Testability**: 
- [ ] Reason 1: The project includes a testing structure using pytest and FastAPI's TestClient, demonstrating that testability has been considered. The tests cover both status codes and specific response logic (such as expected values in certain sections of the balance sheet), ensuring that the application’s behavior can be validated automatically.
- [ ] Reason 2: Organizing the tests in a separate file simplifies the maintenance and extension of tests as the system grows, and aligns with the principle of test-driven development (TDD) if applied from the beginning.

### 2 - Judging Criteria : Frontend Features ###

- **Brevity and Simplicity**: 
- [ ] Reason 1: The code follows the principles of brevity and simplicity. Components like App and BalanceSheet are concise, with a clear and straightforward structure. The usage of React's functional components with hooks (useState, useEffect) is efficient and modern, reducing boilerplate code and making the logic easier to follow.
- [ ] Reason 2: The BalanceSheet component manages the entire data-fetching process, error handling, and UI rendering in a clear, readable manner, with no unnecessary complexity. Error and loading states are handled gracefully, improving the user experience with minimal code.
- [ ] Reason 3: The Dockerfile is simple and to the point, containing only the essential commands to build and serve the frontend, demonstrating the principle of simplicity in deployment.

- **Engineering principles & standards**: 
- [ ] Reason 1: The project follows engineering standards by separating concerns appropriately. Components are modular (App, BalanceSheet), and external services (API calls) are abstracted into a separate service (api.ts). This separation of logic ensures that each part of the application is responsible for a single function, adhering to SOLID principles.
- [ ] Reason 2: The code structure promotes maintainability and readability. For instance, the use of axios for HTTP requests encapsulated in the service layer keeps the data-fetching logic separate from the component rendering logic, aligning with clean architecture principles.
- [ ] Reason 3: The inclusion of a Dockerfile demonstrates adherence to best practices for application deployment and environment consistency, ensuring the project can be run consistently across different systems.

- **System extensibility & Scalability**:
- [ ] Reason 1: The architecture of the frontend is designed to be extensible. New components or services can be added without affecting existing functionality. The modular design of React components allows for easy addition of new features, such as different types of reports or additional UI elements, without modifying the core structure.
- [ ] Reason 2: The project uses TypeScript, which provides type safety and improves scalability. As the codebase grows, TypeScript helps prevent errors by enforcing data types and reducing runtime errors.
- [ ] Reason 3: The Docker setup and build process allow the project to be easily scaled and deployed in different environments. The use of React.StrictMode ensures the frontend code is robust and scalable as the application grows.

- **Testability**: 
- [ ] Reason 1: The project includes Jest tests, and the BalanceSheet component is tested using the React Testing Library, which mocks API calls (jest.mock). This ensures that the core functionality is testable without relying on external data sources, promoting isolated unit testing.
- [ ] Reason 2: The use of mock functions in jest allows for specific scenarios to be tested, such as rendering loading states and verifying data structure. This makes the component highly testable, and it ensures the UI behaves correctly based on the data retrieved from the API.
- [ ] Reason 3: Test coverage includes both user interaction (e.g., checking for loading states) and the proper rendering of fetched data, ensuring the component’s functionality is comprehensively tested.

[Typescript.org]: https://img.shields.io/badge/Typescript-20232A?style=for-the-badge&logo=typescript&logoColor=FF3E00
[Typescript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=4FC08D
[React-url]: https://reactjs.org/
[Tailwindcss.com]: https://img.shields.io/badge/Tailwindcss-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[Tailwindcss-url]: https://tailwindcss.com/
[Jest.io]: https://img.shields.io/badge/Jest-20232A?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Fastapi.com]: https://img.shields.io/badge/Fastapi-20232A?style=for-the-badge&logo=fastapi&logoColor=blue
[Fastapi-url]: https://fastapi.tiangolo.com/
[Pytest.org]: https://img.shields.io/badge/Pytest-20232A?style=for-the-badge&logo=pytest&logoColor=yellow
[Pytest-url]: https://docs.pytest.org/en/stable/