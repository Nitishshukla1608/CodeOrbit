FROM eclipse-temurin:25-jdk AS build

WORKDIR /app/backend

COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .

RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

COPY backend/src src

RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY --from=build /app/backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]