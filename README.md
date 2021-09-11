# senior_react_developer_flexcube

This repository contains A react typescript application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

#### Yarn

```bash
npm i -g yarn
```

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash
git clone git@github.com:dorny-mb/senior_react_developer_flexcube.git
```

Enter the cloned repositories' directory

```bash
cd senior_react_developer_flexcube
```

Install the projects dependencies

```bash
yarn
```

Create a `.env` file based on the [.env.example template](.env.example)

Export the contents of the created `.env` file to the current terminal session.

```bash
set -o allexport; source .env; set +o allexport
```

Make sure the `REACT_APP_OPEN_WEATHER_MAP` var is set in the `.env` file

Start the projects development server

```bash
yarn start
```

The project should now be available at http://localhost:3000

![login page](https://i.imgur.com/N2Kv2UV.png)

## My thougths

- I definitely would have used the paid version of the API or something that was going to give me the ability to get a better formed response from the API and reduce calls and processing.

- If I had more time I was going to adapt theme to the selected weather and create an overall better UI/UX.

## Authors

- **Dorny Muba** <dornymuba@gmail.com>

## Meta

| Version | Author                               | Date       |
| ------- | ------------------------------------ | ---------- |
| 0.0.1   | Dorny Muba <dornymuba2016@gmail.com> | 11/09/2021 |
