# Biri
Biri is a tool that analyses user behaviour within a website to obtain data that then can be used to ask user-related questions. The goal is to trigger more users and to improve the conversion rate of the website.

## Techniques
In order to start working with Biri you need to know a few things. Biri is built with plain JavaScript and uses Firebase to store and retrieve user data. The reason for this technical approach is the transferability. Because of the plain code Biri can be implemented very easily without the use of paid tools.

## Step 1: Set up your own database environment
Biri uses Firebase Realtime Database to write and read user data. In order to use this method you need to define your own database. The steps you need to take to succesfully do this are explained in this video.

## Step 2: The file structure
Working on this repo is not a difficult. We have tried our best to make it as easy and accessible as possible. In order to achieve a modular and easy-to-use repository we have done a few things:

### SCSS file structure
We have set up two SCSS files. First there is the config.scss file, this file contains basic data such as color- and font-presets but also media breakpoints. You need to import this file in any SCSS-file you want to use it in, otherwise variables won't be available. In the style.scss you can find the other styling we have already done for Biri. The monitor.scss contains all the styling for the monitor. Eventually the monitor needs to be removed in order to show a representative prototype so that's why we kept the styling seperated from the rest.

In order to automatically compile your SCSS files we recommend using the free-to-use plugin called [EasySass](https://marketplace.visualstudio.com/items?itemName=spook.easysass).

### JavaScript file structure
We have set up our file structure in a proper way to make to project easy to access. The best way to prevent errors is by copying the example pages. This way all the scripts are imported right and in the right order (important).

#### define.js
In the define.js file we define the database environment we use, in order to start working on Biri this file needs to be changed. In the video from step 1 you can see how to do this.

#### databasemodule.js
This is a JavaScript module that makes working with Firebase easier. It has several function such as adding, reading an removing data with a simple line of code. The documentation for this module is in the file itself and luckily there is a few examples in the code. For questions about this module you can contact Jan de Sterke (j.desterke@student.fontys.nl).

#### monitor.js
In this file we read all the user data from the database and display it in a monitor. This way you can easily see the data that is being collected and the data that has been analysed already.

#### createvisit.js
This file creates a visit for every visit that takes place. All the necessary data for the visit (such as scrolldepth, activetime etc.) is then stored in the visit and the database. It is important that this file runs on every page.

#### multiplier.js
In this file a lot of calculation is done. We use different data sources to calculate the conversion rate and other interesting values. The best way to understand this file is by reading the comments within the file. New calculations, functions and formulas can be added in this file.

## Step 3: Working with Git
We use two different branches: main and develop. All the development can be done in the develop branch. This way we want to prevent merging conflicts and weird branching structures. A new Git Flow can obviously be used, but this is the way we have worked throughout the whole project.
