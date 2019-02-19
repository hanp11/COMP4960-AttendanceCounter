# Boston Code Camp Room Counter

One Paragraph of project description goes here, feel free to update

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* [Git Bash Install Tutorial](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) - Install Tutorial link for gitbash

* [Git Bash](https://git-scm.com/downloads) - Install link to gitbash
(installation and running virtualenv will be easier from gitbash)

* [Python Install](https://realpython.com/installing-python/#windows) - Install Python 3.x and Pip
Verify Python Install
```
python --version
```
Verify Pip Install
```
pip --version
```

### Installing

A step by step series of examples that tell you how to get a development env running

Step 1.) Clone project

```
git clone https://github.com/hanp11/COMP4960-AttendanceCounter.git
```
Step 2.) Install Requirements

```
pip install -r requirements.txt
```
Step 3.) Activate Virtualenv

```
source COMP4960/Scripts/activate
```
You should see
```
(COMP4960)
User@Computer MINGW64 ~/Programming/COMP4960-AttendanceCounter (branch_name)
$
```
Step 4.) Verify Django Install

```
python -m django --version
```
If done correctly you should now be able to run the Django Server

## Running the Django Server

From 
```
COMP4960-AttendanceCounter/django_project
```
run
```
python manage.py runserver
```

## Project Structure 

HTML + Javascript
```
COMP4960-AttendanceCounter/django_project/boston_code_camp/templates/boston_code_camp
```
CSS
```
COMP4960-AttendanceCounter/django_project/boston_code_camp/static/boston_code_camp
```

## Built With

* [Django](https://www.djangoproject.com/) - The backend framework used
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


