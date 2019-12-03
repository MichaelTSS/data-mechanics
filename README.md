# Data Mechanics take-home assignments for front-end engineers

Thanks for applying!

For the integrity of the process, please do not distribute or make public the assignment. Thank you!

## Context

At Data Mechanics, we provide our users with a dashboard to monitor and manage the Spark applications they run on our platform.

The user is interested in viewing basic information about their apps:

- what apps are currently running on the cluster, which ones are finished
- duration, start time, end time of their apps,
- the error message when an app failed,
- the log of the app

## Your task

Running `api/serve.sh` launches an API on `http://localhost:3000/` that exposes information about the apps running on a cluster.

Your mission is to build a dashboard web app that fetches information from the API and displays it in a neat way to the user.

### Description of the expected UI

The UI contains two logical units:

- the `apps` page lists all the applications running or recently run on the cluster
- the `app` page deep-dives on a specific application

#### `apps` page

It shows at a glance all the applications running or recently run on the cluster.

To provide a global idea of what is happening on the cluster, it makes sense for this page to feature pieces of information like:

- duration, start and end time (if applicable)
- state of the app (running, failed, completed)
- number of executors
- a delete button that kills a running application or erases a completed application from the dashboard (see API description)

#### `app` page

This page offers a more complete view of a Spark application.

It should contain the same information as the `apps` page regarding this application.
And additionally:

- the log of the Spark application
- the configuration (this is a JSON object that can be rendered as is to the user. For instance in a code block)

### Constraints and assumptions

- Do not provide an auth mechanism
- We'd prefer a React front-end, but ultimately if you feel more comfortable using another framework, please do it

### What we'll evaluate

- How you architect your code to be maintainable, readable and extendable
- How you manage to put yourself in the shoes of our data engineer end user and address his needs
- The overall look and usability of the front-end code

Unit tests are not expected.

## Provided code

In a terminal, run

```bash
api/serve.sh
```

This launches an API on `http://localhost:3000/` with the following routes:

- `GET /api/apps/` that lists all apps
- `GET /api/apps/<appName>` that provides information about a single app
- `GET /api/apps/<appName>/log` that yields the log of a Spark application
- `DELETE /api/apps/<appName>` that deletes a Spark application

## API content

This is all the information available in the API about a Spark application:

```bash
curl http://localhost:3000/api/apps/appnexus-20191125-103438-fx777
```

```json
{
  "appName": "appnexus-20191125-103438-fx777",
  "jobName": "appnexus",
  "configTemplateName": "",
  "config": {
    "type": "Scala",
    ...
  },
  "status": {
    "sparkApplicationId": "spark-f9cdc1ef307c48d2b2c77f3063a76f84",
    "submissionID": "e377354f-20ee-41a0-9877-4c729a783ba3",
    "lastSubmissionAttemptTime": "2019-11-25T10:34:42+00:00",
    "terminationTime": "2019-11-25T10:37:01+00:00",
    "driverInfo": {
      "webUIServiceName": "appnexus-20191125-103438-fx777-ui-svc",
      "webUIPort": 4040,
      "webUIAddress": "10.31.254.160:4040",
      "podName": "appnexus-20191125-103438-fx777-driver"
    },
    "applicationState": {
      "state": "COMPLETED"
    },
    "executorState": {
      "appnexus-20191125-103438-fx777-1574678080042-exec-1": "COMPLETED",
      "appnexus-20191125-103438-fx777-1574678080042-exec-2": "COMPLETED",
      ...
    },
    "executionAttempts": 1,
    "submissionAttempts": 1
  }
}
```

| Field                                  |  Type  |                                                                                                                               Explanation |
| -------------------------------------- | :----: | ----------------------------------------------------------------------------------------------------------------------------------------: |
| appName                                | string |                                                                                                               the name of the application |
| jobName                                | string |                                                                                                                  discard for the exercise |
| configTemplateName                     | string |                                                                                                                  discard for the exercise |
| config                                 | object | this is the configuration of the Spark app. For this exercise, assume that the user is used to see Spark app configs as raw JSON objects. |
| status                                 | object |                                                                                          the complete description status of the Spark app |
| status->sparkApplicationId             | string |                                                                                                                  discard for the exercise |
| status->submissionID                   | string |                                                                                                                  discard for the exercise |
| status->lastSubmissionAttemptTime      | string |                                                                                                         the start time of the application |
| status->terminationTime                | string |                                                                                                           the end time of the application |
| status->driverInfo                     | object |                                                                                                                  discard for the exercise |
| status->applicationState               | object |                                                                                                      the global status of the application |
| status->applicationState->state        | string |                                                                                                can be RUNNING, FAILED, PENDING, COMPLETED |
| status->applicationState->errorMessage | string |                                                                                                 an optional error message for FAILED apps |
| status->executorState                  | object |    the status of every executor launched by the Spark app. For this exercise, this object is only useful for counting the # of executors. |
| status->executorState->{executorName}  | string |                                                                                                can be RUNNING, FAILED, PENDING, COMPLETED |
| status->executionAttempts              |  int   |                                                                                                                  discard for the exercise |
| status->submissionAttempts             |  int   |                                                                                                                  discard for the exercise |
