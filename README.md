# 1800s Clothing

1. [Introduction](#introduction)
2. [History](#history)
3. [Structure and Features of this version](##structure-and-Features-1800clothing-v3)
4. [Future enhancements](#future-enhancements)


## Introduction 

The intention of the 1800s Clothing site is to provide period-accurate images of clothing from the 1800s. It's value proposition is the accuracy and addition information provided by a pair of experts from their compiled research. Carma de Jong Anderson, and Lorie Davis. This information is presented in tiles with the picture, description, and additional details. It's intended for artists, authors, historians, and costume designers to have correct information for their research and projects.

In this readme, we'll briefly note the site's bumpy version history. Following, some information on the structure and features of the site in this incarnation, including the file structure and technology used. Finally, we'll layout a few possible directions that the site can be taken in for improvement.

## History

The site began it's life as a group project in the Computer Science area of Utah Valley University. The initial site had many problems: it had little input from UX design, links that broke the CSS if pressed in a certain combination, and a database written in some inscrutable form of PHP that sometimes simply refused to load. Add to that, the actual content was not what the client wanted presented, and the quality of the images used was low. There was also absolutely no documentation of the structure, setup, functions, or technology used in the code.

Version 2 of the site began as a desire from the client for a backend to be added to add additional entries. But it was quickly apparent to the Digital Media group (also at UVU) who took on the project that giving the ability to add entries to a site who looked and worked so poorly would be pointless. That idea was scrapped, and the effort of v2 was to simply revise the site in simple HTML and CSS with a few small vanilla JavaScript functions to fix all broken links, and load the clothing images and their information promptly. The styling was only simply revised, and little consideration was taken into true UX design: the goal was simply to get a working product out the door. The backend for getting costumes data was replaced with a Heroku Node API server that returns costumes to the frontend. However, the downside of using the free tier of Heroku is that the server goes to sleep after 30 minutes of activity.

By the end of version 2, a working version was completed and uploaded to Bluehost where 1800clothing.org is hosted, but it was clear to the developers of this version (that's us) that a lot more would need to be to move the site from "working" to "usable", including input from design, and basically an entire restructuring of the site and its technology to make it modern. Thus, this version, Version 3.

## Structure and Features: 1800clothing v3

### Design

The site is broken up into three main pages; the main page (which is the costumes page), the Book page, and the About page. In the past there were additional pages for contact and permissions, however these pages were deemed unnecessary and could be implemented in different ways. 

### Technologies

The main site was built in [Svelte](https://svelte.dev/), a modern and very fast JavaScript framework that compiles all of it's simplified language into vanilla JavaScript, CSS, and HTML. Svelte, similar to React, works best as components nested together. It serves the site from the `/src` folder, and compiles into the public folder, which is where the site is served when deployed.

Individual pages are served using [`svelte-routing`](https://www.npmjs.com/package/svelte-routing), and the built in `rollup` does the work of packaging the components to the `public` folder. The pagination is provided by [`svelte-paginate`](https://www.npmjs.com/package/svelte-paginate).

For the database, there were a limited number of economical options that didn't have a mandatory sleep where it takes 10-15 seconds to wake up after a period of inactivity. In v2 we accepted this as a compromise, but for this one, we opted instead to go serverless. Because the total number of costume/clothing entries is just around 1000, this serves from a local JSON (`costumes.json`) with limit loading time, and immediate response. This does make adding additional entries a little more manual, but for the scope at present it served the need.

#### Making the costumes.json

The costumes.json file is created by converting a CSV file to a JSON file. CSV files are files that can be open in spreadsheets, and so our main environment for transferring the data from the Book PDFs to a form that an application can use was copying and pasting the info from the book to a spreadsheet. This method is better than just editing a JSON file. The site https://csvjson.com/ was used to convert the CSV files to JSON. A copy of the CSV files is included in this repo, so you can just open that file in a Google Document or Excel to edit the costumes.

#### Getting access to Bluehost FTP 

The site is currently being hosted on Bluehost. The Bluehost account hosting the site is owned by Dan Hatch, so in order to get the credentials for the FTP, you need to get it from him. The files for 1800clothing are located in a folder. In the past, the site used to run off of PHP, however we don't recommend you go back to using any of the PHP used in the past. We wasted a lot of time on this for the Interaction Design practicum, but it's really just a dead end. If you're going to build a back end for this site, you should probably do it off of the Bluehost server.

#### Previous repos for the project

Repo for the frontend and images of version 2 of 1800 clothing: https://github.com/timetoady/1800clothing

Node server for serving costumes to front end app: https://github.com/bingland/1800-clothing-node

A prototype for 1800s clothing written in React: https://github.com/bingland/1800-clothing-react

### Structure

`/src` houses all the Svelte parts. These are broken into components, with `App.svelte` being the parent component, housing `Landing.svelte` and the `Nav`
`/public` is where all compiled JavaScript, CSS and HTML are stored, as well as all assets (costume images, costume thumbnails, and the original decade chapter PDFs.) There are also a couple more global CSS files in public (`global.css` for the whole document, `landingStyles.css` for the landing page, and `compStyles.css` for the nav component) because of the way Svelte governs CSS only to locally declared elements. 


## Future Enhancements

* True database & backend - if the entries are going to be adding over time, setting up a paid database and backend to for an admin to update it would be valuable. At present, it's not certain how many more costume entries there will be, if any, so beyond research into MongoDB and GraphQL/PostgreSQL (either of which would be great DB options, served via Express or Prisma/Nexus, respectively) this could be pursued.

* Applied SEO - the client expressed interest in having a user searching in Google Images and having it lead to the site. SEO could be it's entire own project, with Google Analytics, page updates, and findability. 

* Improved mobile functionality - since the majority of users tested as focusing on the desktop version (academic and work research tends to not be done on mobile) the majority of our attention was placed there. The site is still reasonably responsive, but menu and layout improvements can definitely be made if it becomes apparent that users are focusing there.

* Some costume items have multiple images - currently the only first image for each costume displays, it would probably be a good idea to have an image system that is able to display all images.

* Copyright form - There is a Copyright Form that was made, however when we tried hooking it up to Netlify form handling, it wouldn't work so we had to cut it out. There is currently not a backend for this site, so if you can implement form handling then there is a copyright form already made for you. The link for the form is currently commented out in the FilterArea2 component.
