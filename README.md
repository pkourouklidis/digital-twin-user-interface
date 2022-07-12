## Kleio Workbench UI template project

This project contains the base UI for Kleio workbenches, which run as part of the Kairos platform. The template project provides the following components:

- Header bar with logo
- BT user authentication using OAuth
- Project management (creation, loading, sharing, removal)
- Repository and deployment registration
- Other Kleio workbench selection and context switching
- Notification management (uses URL-based intent mechanism)
- Toast message management for success, failure, warning and info

The app is based on React and centres on the use of material ui as well as redux. It defines three areas where the template can be extended to create specialised web apps:

- **src/features/app/views/NoProjectDashboard.js:** This content will get loaded when the workbench is loaded but no project has been selected yet.
- **src/features/app/views/ProjectDashboard.js:** This content will get loaded when a project is loaded.
- **src/features/app/views/HamburgerMenuContent.js:** This content get loaded into the hamburger menu on the left of the screen.

## Setting up and running your project

The project uses **yarn** as its build system, so the first step is to install yarn on your machine. Once this is done, you can clone the repo and start your project. First you have to instruct yarn to pull in all the dependencies by running this command in the project folder:

```bash
$ yarn install
```

When complete, you can now start your project using this command:

```bash
$ yarn start
```

## Configuration

This project uses environmental variables for its configuration, to which the user can add their own. The configuration can be set indvidually for unstable, master and release maturity as well as for the development environment in the following files:

- *.env.development*
- *deployment/envs/unstable.env*
- *deployment/envs/master.env*
- *deployment/envs/release.env*

In these files you can set the name of your application  by changing the value for the **REACT_APP_NAME** environmental variable. If your application has no need for a hamburger menu you can disable it by setting the environmental variable **REACT_APP_HAMBURGER_MENU**  to *no*.

## Setting up the build pipeline and configuring deployment

Once you are happy with your project, you set up a gitlab pipeline that helps build the project ready for production. Do this by renaming the *template.gitlab-ci.yml* file to *.gitlab-ci.yml* and updating the following values under the *variables*-section:

- PROJECT_NAME
- DOCKER_PROJECT_NAME
- KUBERNETES_NAMESPACE

For the deployment into the kubernetes cluster the corresponding namespace needs to be created and you need to have access to it. For the deployment itself now only the hostname (the url for reaching the workbench) needs to be set. This can be done by modifying the following specification on line 71 in the *deployment/ui.yml* file:

```yml
host: ui.$CI_MERGE_REQUEST_TARGET_BRANCH_NAME.<WORKBENCHNAME GOES HERE>.cluster.rp.bt.com
```

For the build process it is a good idea to change **sonar.projectName** and **sonar.projectKey** in the following files for sonarqube analysis:

- *sonar-project.properties*
- *configs/sonar/unstable.properties*
- *configs/sonar/master.properties*
- *configs/sonar/release.properties*

## Getting started

The default way of basing your new workbench of the template is to **clone** this repository, rather than cloning. This is because if further changes are made to the template project they can be downstreamed to the new workbench ui code while not having to sync your changes back to the template. Final note, this app uses *Material UI* as its core set of widgets to build up the ui, so for consistency it would be good to limit ourselves to that. Specifically this app uses [**Material UI version 4**](https://v4.mui.com/).