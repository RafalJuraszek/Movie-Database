# Movie Database

> Database of films using micro-services (not finished - look at the issues)

## Important
Configuration Server provides needed configuration for the rest of services. You should run it first.
Additional, you have to set your own path to the `config-repo` folder (in the application.properties, this folder has to be a git repository). In my case:
```
spring.cloud.config.server.git.uri=file:///${user.home}/config-repo
```

## Data
You can use command from `init.data` file in order to initialize mongo database.

## App

![Image1](pictures/login.PNG)

![Image2](pictures/signup.PNG)

![Image3](pictures/films1.PNG)

![Image4](pictures/films2.PNG)

![Image5](pictures/view.PNG)

![Image6](pictures/view2.PNG)

![Image7](pictures/profile.PNG)

![Image8](pictures/discover.PNG)
