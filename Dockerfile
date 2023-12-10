#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# build react app stage
FROM node:stable-alpine as react-build
WORKDIR /app
COPY Client/package*.json ./
RUN npm install
COPY Client/ .
RUN npm run build

# base asp structure
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV AUTH_USER default
ENV AUTH_PW password
ENV UPLOAD_DIR /uploads

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["CloudDrop.csproj", "."]
RUN dotnet restore "./CloudDrop.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "CloudDrop.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CloudDrop.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=react-build /app/build .
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CloudDrop.dll"]