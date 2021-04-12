# Biri
Biri is a tool that analyses user behaviour within a website to obtain data that then can be used to ask related questions. The goal is to trigger more users and improve the conversion rate of the website.

## Techniques
In order to start working on Biri you need to know a few things. Biri is built with plain JavaScript and uses Firebase to store and retrieve user data. The reason for this technical approach is the transferability. Because of the plain code Biri can be implemented very easily without the use of paid tools.

## Step 1: Set up your own database environment
Biri uses Firebase Realtime Database to write and read user data. In order to use this method you need to define your own database. The step you need to take to succesfully do this are explain in this video.

## Step 2: The file structure
Working onm this repo is not a difficult task. We have tried our best to make it as easy and accessible as possible. In order to achieve a modular and easy-to-use repository we have done a few things:

### SCSS file structure
We have set up two SCSS files. First there is the config.scss file, this file contains basic data such as color- and font-presets but also media breakpoints. You need to import this file in any other SCSS you want to use it in, otherwise variables won't be available. In the style.scss you can find the other styling we have already done for Biri.

