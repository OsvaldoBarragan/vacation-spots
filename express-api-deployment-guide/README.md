[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express Deployment with Heroku

You've learned a lot about how to build a Node application over the last
few weeks. Now let's 'go public' and share our apps with the world!

## Prerequisites

- [Express Api](https://git.generalassemb.ly/ga-wdi-boston/express-api)
- This guide assumes you have followed
[these installation instructions](https://git.generalassemb.ly/ga-wdi-boston/express-api-template#installation)
to set up the express api template.

## Objectives

- Create a Heroku app from the command line.
- Push the latest code to Heroku.
- Set up MongoDB Atlas
- Add environment variables
- Share a link to your app.

## Video Walkthrough

This video will walk you through the rest of the guide.

https://drive.google.com/file/d/1-qyt4EZB0voK8Q_jSPrGfEmq3tHWx4VZ/view?usp=sharing

## Sign Up for Heroku 

- [Follow Heroku Account Set Up Steps Here](https://git.generalassemb.ly/ga-wdi-boston/heroku-setup-guide#getting-set-up)

## Deploying to Heroku

Begin inside the root directory of your application (the directory you
just renamed to `express-upload-api` from `express-api-template`) deploy a new
application to Heroku:

- [ ] Run `heroku create` in the command line in the root of your Express API to
create a new (blank) app on Heroku.
- [ ] Commit to your local `main` branch
(if you do not have a branch named `main`, you can create one with `git checkout -b main`)
- [ ] Push your latest code to Heroku (`git push heroku main`)
- [ ] Add any addons
  - [ ] If using MongoDB you'll need to follow the [atlas add on steps](#creating-atlas-addon)
  - [ ] If using AWS you'll need to follow the [aws credentials steps](#add-aws-credentials)
- [ ] In terminal, run: `git push heroku main`  (should build your site)
- [ ] Due to the first line of code in the `server.js` file, the default
deployment environment will be `production`
- [ ] You need to set your CLIENT_ORIGIN so that your deployed API will ONLY
accept requests from the correct domain. IF you're client is deployed on GitHub,
your ORIGIN will be:
      `https://<% github username %>.github.io`
- [ ] Set your client ORIGIN by:
      `heroku config:set CLIENT_ORIGIN="https://<% github username %>.github.io"`
- [ ] You should have (at least) two config variables set in heroku
(`heroku>settings>config vars`): DB_URI and CLIENT_ORIGIN
  - [ ] If you are using AWS, you should have two additional config variables.
- [ ] Once all of these are set, run in terminal: `heroku restart`
- [ ] Then in terminal, run: `heroku open`

**NOTE:** `heroku open` will open your deployed Express API in the browser. It will most likely be a blank white page that says `Cannot GET /`. This is expected since you probably did not create a route for the path `/`. To verify your deployment worked, you can change the path in the URL to match a valid route you did define in your app (e.g. if I have a GET route for `/books`, I should see some JSON when I add `/books` to the URL).

A full list of Heroku commands can be accessed by running `heroku --help`

### Share Your App **(REQUIRED)**

1. Fork and clone this repository.
1. Change into the new directory.
1. Create and checkout a new branch, named `response`.
1. Delete the contents of [deployedUrl.txt](deployedUrl.txt) with the URL of your
deployed heroku application.
1. Add, commit, and push your changes.
1. Open a PR on this repository [here](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide/compare).

Your pull request description should contain a "fist to five" for comfort and
clarity. Additionally, you should mention the resources you used to help you
complete this guide. For example:

```md
Comfort: 3
Clarity: 3

I used Google and my class notes to help with this exercise.
```

You may wish to refer to [FAQs](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/)
related to
[forking,
cloning](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone),
and [pull requests](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/PullRequest).

## Creating Atlas addon

- [ ] Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/) and sign in
- [ ] Since the free-tier of MongoDB Atlas only allows one cluster
per project, create a new project and a new cluster, selecting the "Free" version
- [ ] Once the cluster has been created, click "connect" on the cluster overview
- [ ] **Setup connection security:**
  - [ ] For "step 1: Add a connection IP address", select Allow Access From Anywhere
  - [ ] Create a user, `admin`, with a password. Save these credentials
  somewhere safe.
- [ ] **Choose a connection method:**
  - [ ] Select "Connect your application"
  - [ ] Select "Node.js" as the driver, version 3.6 or later
  - [ ] Copy the connection string provided
- [ ] In terminal, run `heroku config:set DB_URI="<your-connection-string>"`,
replacing the `<password>` with the password you created for the `admin` user
and `<dbname>` with the name of your database.
  - [ ] Ex: `heroku config:set DB_URI="mongodb+srv://admin:yellowpencil@cluster0.pygcn.mongodb.net/atlas_db_test?retryWrites=true&w=majority"`
  - [ ] NOTE: You don't have a database at this point yet, but MongoDB  will
create it as soon as you use your application to create data. So, in the
example above, the `atlas_db_test` database will not exist until the first user
is created via a sign-up.

Finish up the final deployment steps, then test your app to make sure it worked.

**[return to Deploying Heroku](#deploying-to-heroku)**

### Add AWS credentials

- Make sure you have generated your [AWS secrets](https://git.generalassemb.ly/ga-wdi-boston/aws-s3-setup-guide#aws-s3-access-control)
and have them in your local `.env` file. Things should work locally when interacting
with AWS.
- Remember, your `.env` file contains secret credentials and should _NOT_ be
committed to git or pushed to GitHub. So, to deploy your app to another server,
we have to manually set up the `.env` for that server, by hand.
- On Heroku, this is done via the `heroku config:set` command from the command line (or via the Heroku web dashboard):
   - `heroku config:set SOME_KEY=some value`, just like we did when we first [deployed our express app](https://git.generalassemb.ly/ga-wdi-boston/express-api-deployment-guide#deploying-to-heroku)

**[return to Deploying Heroku](#deploying-to-heroku)**

## WARNING: Ephemeral Filesystem

One serious limitation of Heroku is that it provides an 'ephemeral filesystem';
in other words, if you try to save a new file inside the repo (e.g. an uploaded
image file), it will disappear when your app is restarted or redeployed.

As an example, try running the following commands:

```sh
heroku run bash
touch happy.txt; echo 'is happy' > happy.txt
cat happy.txt
```

Then, hit Ctrl-D to get out of heroku bash shell. If you re-open the shell and
run `ls -l`, `happy.txt` will be missing!

The typical workaround is to save files in cloud storage such as [Amazon
S3](https://aws.amazon.com/s3/).

## Troubleshooting

- **First step upon encountering an issue should be to run `heroku logs` to
read the logs of your deployed heroku server**
- [Heroku Addons](https://devcenter.heroku.com/articles/managing-add-ons)
- [Previous Issues](https://git.generalassemb.ly/ga-wdi-boston/team-project/issues?utf8=%E2%9C%93&q=is%3Aissue%20deploy%2C%20heroku)
- If you are getting a CORS error and the `CLIENT_ORIGIN` is correct, ensure the
`DB_URI` is set successfully with the value that MongoDB Atlas provides for your cluster.

## Additional Resources

- [Heroku Command Line](https://devcenter.heroku.com/categories/command-line)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
