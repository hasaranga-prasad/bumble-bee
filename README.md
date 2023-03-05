# Bumble bee

[![Build Status](https://travis-ci.org/codecentric/springboot-sample-app.svg?branch=master)](https://travis-ci.org/codecentric/springboot-sample-app)
[![Coverage Status](https://coveralls.io/repos/github/codecentric/springboot-sample-app/badge.svg?branch=master)](https://coveralls.io/github/codecentric/springboot-sample-app?branch=master)
[![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

online loan providing application

## Requirements

For building and running the application you need:

- [JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Gradle 8](https://docs.gradle.org/current/userguide/userguide.html)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `com.bumble.bee.app.BumbleBeeServiceApplication` class from your IntelliJ IDEA.

## How to run it locally?

Using IntelliJ IDEA IDE

    Run -> Configurations -> BumbleBeeServiceApplication 

If you have gradle installed and under linux/mac:

    gradle runJar

If gradle is not installed, but still under linux/mac

    gradlew runJar

And for windows without gradle

    gradlew.bat runJar

After the server is running, go to
```
http://localhost:8088/swagger-ui/index.html
```