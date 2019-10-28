# Capstone Prototype

This is all being hosted at [synlern.com](synlern.com). Please read the readme located in the root of this directory for future information!

## Requisite software / programs

If you have never installed this programs beforehand, if your using a Mac or Linux machine, you will be able to install almost all of these with Homebrew / package-manager respectively. (Except NodeJS on Mac, with Homebrew I believe)

Installing these though those methods is significantly easier that anything by hand. If you are on windows ensure that all software is **mounted to path!**, and were possible **enable service on startup!**. Not doing these can / will cause issues down the line.

* [NodeJS](https://nodejs.org/en/), Version LTS (12.13.0 at the time of writing). You will want the installer / packaged version, vs the zip version.

    * Run the Node installer
    * Ensure that Add To Path is going to be 'installed', should be default
    * Ensure that you will be downloading the tools to run C/C++ things
    * Click install

* [MongoDB Community Edition](https://www.mongodb.com/download-center/community), Version 4.2 or greater (252Mb?) [Install](https://docs.mongodb.com/manual/administration/install-community/)

    * Run MongoDB install
    * Agree to everything
    * Setup
        * Complete Setup or Custom, you want complete
    * Service configuration
        * Install as a (network service) or local/domain user, just default setting
        * Leave as default
    * Don't install MongoDB Compass, there are significantly better tools out there
    * Click install

Having installed node, you can close the terminal that appears.

## Install instructions

 1. Download / install a method of downloading this repository with a git client, terminal or otherwise. This can be achieved through two ways

    * Using a Git Client like [SourceTree](https://www.sourcetreeapp.com/), [GitKraken](https://www.gitkraken.com/), [GitHub Desktop](https://desktop.github.com/), Tower etc, of your choice. **Highly recommended**
    * Using terminal, and installing ```git``` directly onto your machine. Download from this website [https://git-scm.com/download](https://git-scm.com/)
        * If you have chosen to install git follow these instructions
        * Run the installer
        * If you so choose, add a desktop icon. Otherwise leave all settings as is
        * Default settings for start folder
        * Default editor for git
            * Pick what ever you know and feel comfortable with. If you do not recognize any of the programs listed. Then use the default VIM, as it wont require any extra steps.
        * Default selection for PATH variables, should be the one in the middle
        * Default to SSL library for security.
        * Default selection for check-in / check-out line ending style
            * Check out windows, commit unix
        * Picking terminal
            * Pick the "Use Windows Default Console Window"
        * Default extra options
        * Default experimental options
        * Install!

 2. Download this repository with the following command / link, into your selected file location (if you don't have folder, make one). The command will need to be run in 'git bash' if you have installed git on windows. Otherwise in terminal on unix systems. If you picked a Git Client, then you only need the https:// url.

    ```bash
    git clone https://github.com/Technosasquach/Capstone_APIPrototype.git
    ```

 3. Once fully downloaded, all dependencies have to be installed. This command should be run inside of cloned repository (```./yourFile/Capstone_APIPrototype```). Will need to be run in bash / terminal / command prompt (not PowerShell!).

    ```bash
    npm install
    ```

    If it fails to install because it cannot find npm, then you did not mount it to path. Install node again with this option, and restart your terminal

    If it fails because of ```mkdir``` or permissions. You need to run your command prompt as Admin.

 4. Having fully started, you simply start the application with the command. Will need to be run in bash / terminal / command prompt (not PowerShell!). If you have the same console window open as before, you can just run this command.

    ```bash
    npm start
    ```

    However if you intend to perform development work on the system, then the following command will be more suited to your needs. It auto re-builds both client and server.

    ```bash
    npm run watch
    ```

    If you get a windows defender alert, your windows probably just have sensitive settings.

    **IF YOU PLAN TO USE THE DATABASE WE HAVE PROVIDED (IT CONTAINS A FULL NODE DB), THEN DO NOT CREATE A  USER YET. SKIP TO THE DATABASE IMPORTING SECTION)**

 5. In order to access the website. Open your desired web browser and navigate to the site in the URL ```localhost:3000```. You have not used the application, or attached a DB or anything like that, you can create a new user with the 'register now' link.

## Database Importing

The core repository does not come with a easy way to attach a pre-made database. We have exported a stable and known copy of the DB in the folder ```./db```. The following lines are the commands required to attach them to your **running** MongoDB instance.

Each of these lines must be run individually! You cannot copy and paste this whole block.

If you are using a **Windows** machine, then you will need to install these a bit differently to how you might expect. The MongoDB instance that you installed, is currently running in the background. You will need to run the correct script / bash / terminal deep inside your machine. The following directory is where it should be located if you have installed everything as described above, to defaults.

```bash
C:\Program/ Files\MongoDB\Server\4.2\bin\
```

The next step is you want to prepare these commands to work

```bash
mongoimport --db synlern --collection users --file ./db/users.json

mongoimport --db synlern --collection nodes --file ./db/nodes.json

mongoimport --db synlern --collection information --file ./db/information.json

mongoimport --db synlern --collection comments --file ./db/comments.json

mongoimport --db synlern --collection quizzes --file ./db/quizzes.json

mongoimport --db synlern --collection courses --file ./db/courses.json

mongoimport --db synlern --collection accounts --file ./db/accounts.json
```

Note: There is a potential error where the field size of JSON for the nodes.json file

## Possible Errors

* The most notable error is with a package we used called BCrypt. Its a performant

## Developers/Contributors

* Jonn Dillon - Backend Developer - @Technosasquach
* Luke Daniels - Frontend Developer - @Lukecam07
* Chris Linnen - Frontend + UI/UX Developer - @gitchristopher
* Morrie Hawas - Project & Client Manager - @Moza1111