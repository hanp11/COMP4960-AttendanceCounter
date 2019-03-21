# Boston Code Camp Room Counter

One Paragraph of project description goes here, feel free to update

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* [Git Bash Install Tutorial](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) - Install Tutorial link for gitbash

* [Git Bash](https://git-scm.com/downloads) - Install link to gitbash
(installation and running virtualenv will be easier from gitbash)

* [Node Install](https://nodejs.org/en/download/) - 
Verify Node Install
```
node --version
```
Verify npm Install
```
npm --version
```
* [XAMPP Install](https://www.apachefriends.org/download.html) - (7.1.27)
Once Downloaded, Start
```
Apache,
MySQL
```
Go to 
```
http://localhost/phpmyadmin/index.php
```
Click SQL Tab at Top, and copy contents from MySQL.txt in this directory
```
Paste contents into SQL Tab
```

### Installing

A step by step series of examples that tell you how to get a development env running

Step 1.) Clone project

```
git clone https://github.com/hanp11/COMP4960-AttendanceCounter.git
```
Step 2.) Install Requirements
```
npm install express express-fileupload body-parser mysql ejs req-flash --save
```
If done correctly you should now be able to run the Node Server

## Running the Node Server

From Git Bash in top level of 
```
/COMP4960-AttendanceCounter/
```
run
```
nodemon app.js
```

## Project Structure 

HTML are .esj files
```
COMP4960-AttendanceCounter/views/*.esj
```
Server code with SQL are .js files
```
COMP4960-AttendanceCounter/views/*.js
```

## Built With

* [Node](https://nodejs.org/) - The backend framework used
* [Bootstrap](https://getbootstrap.com/) - The CSS Stylesheet
* [MySql](https://www.mysql.com/) - Database server

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Gina Boccuzzi** - *Database* - [GitHub Profile](https://github.com/boccuzzig)
* **Christopher Burgess** - *Database* - [GitHub Profile](https://github.com/)
* **Justin Chafe** - *Say what you did* - [GitHub Profile](https://github.com/)
* **Phyu Han** - *UI* - [GitHub Profile](https://github.com/hanp11)
* **Robert Hird** - *Backend* - [GitHub Profile](https://github.com/HirdrWit)
* **Kristin Johnson** - *Database* - [GitHub Profile](https://github.com/johnsonk16)
* **Sam Letendre** - *Backend* - [GitHub Profile](https://github.com/SLetendre23)
* **Jacob Marra** - *UI* - [GitHub Profile](https://github.com/jmarra14)
* **Devin Nguyen** - *UI* - [GitHub Profile](https://github.com/Nguyend23)
* **Chris Pisani** - *Backend* - [GitHub Profile](https://github.com/ChrisPisani)
* **Jimmy Thakkar** - *UI* - [GitHub Profile](https://github.com/jimish15)

See also the list of [contributors](https://github.com/hanp11/COMP4960-AttendanceCounter/graphs/contributors) who participated in this project.


