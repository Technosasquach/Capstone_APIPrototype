# Capstone Prototype

## Requiste software / programs

If you have never installed this programs beforehand, if your using a Mac or Linux machine, you will be able to install almost all of these with Homebrew / package-manager respectively. (Except NodeJS on Mac, with Homebrew I believe)

Installing these though those methods is significantly easier that anything by hand. If you are on windows ensure that all software is **mounted to path!**, and were possible **enable service on startup!**. Not doing these can / will cause issues down the line.

 * [NodeJS](https://nodejs.org/en/), Version LTS (12.13.0 at the time of writting)
 * [MongoDB Community Edition](https://www.mongodb.com/download-center/community), Version 4.2 or greater

## Install instructions

 1. Download / install a method of downloading this repository with a git client, terminal or otherwise. This can be achieved through two ways

    * Using a Git Client like SourceTree, GitKraken, GitHub Desktop, Tower etc, of your choice. **Highly recommended**
    * Using terminal, and installing ```git``` directly onto your machine

 2. Download this repository with the following command / link, into your selected file location. Will need to be run in bash / terminal / command prompt (not powershell!)

    ```bash
    git clone https://github.com/Technosasquach/Capstone_APIPrototype.git
    ```

 3. Once fully downloaded, all dependencies have to be installed. This command should be run inside of the file that you cloned the repository into. Will need to be run in bash / terminal / command prompt (not powershell!)

    ```bash
    npm install
    ```

    If it fails to install because it cannot find npm, then you did not mount it to path. Install node again with this option, and restart your terminal

 4. Having fully started, you simply start the application with the command. Will need to be run in bash / terminal / command prompt (not powershell!)

    ```bash
    npm run start
    ```

    However if you intend to perform development work on the system, then the following command will be more suited to your needs. It auto re-builds both client and server.

    ```bash
    npm run watch
    ```

## Database Importing

The core repository does not come with a easy way to attach a pre-made database. We have exported a stable and known copy of the DB in the folder ```./db```. The following lines are the commands required to attach them to your **running** MongoDB instance.

Each of these lines must be run individually! You cannot copy and paste this whole block.

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

## Developers/Contributors

 * Jonn Dillon - Backend Developer - @Technosasquach
 * Luke Daniels - Frontend Developer - @Lukecam07
 * Chris Linnen - Frontend + UI/UX Developer - @gitchristopher
 * Morrie Hawas - Project & Client Manager - @Moza1111