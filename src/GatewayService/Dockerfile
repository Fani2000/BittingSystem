FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

WORKDIR /app

EXPOSE 80

# copy all .csproj files and restore as distinct layers. Use of the sae COPY command
# For every dockerfile in the project to take advantage of docker caching

COPY DotnetMicroservices.sln DotnetMicroservices.sln 
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

# Restore package deps
RUN dotnet restore DotnetMicroservices.sln

# Copy the app folders over
COPY src/GatewayService src/GatewayService
COPY src/Contracts src/Contracts

WORKDIR /app/src/GatewayService

RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 

WORKDIR /app

COPY --from=build /app/src/out .

ENTRYPOINT [ "dotnet", "GatewayService.dll" ]