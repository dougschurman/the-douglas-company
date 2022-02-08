# OrdersProject
React JS web app using Material UI, includes mobile friendly version when broken down, accessing an ASP.NET Core web API that uses Entity Framework Core and a SQL Server database.

Most challenging project up to this date as I was completely unfamiliar with Typescript, React, MUI, APIs, and C#. Through mentors and documentation, I was able to familiarize
myself with enterprise level practices and clean code, though I have a lot to improve on design and organization wise.

Currently using Docker to containerize the project and push it to Heroku for hosting, but this is still in progress and may change in the future.

Instructions to run locally:
- appsettings.json file with connection string for database, running the backend will create tables and populate.
- dotnet restore to install C# packages
- yarn install to install js packages
- yarn dev:start to compile front end
