# 1800s Clothing

1. Introduction
2. History
3. Structure and Features of this version
4. Future enhancements


## Introduction 

The intention of the 1800s Clothing site is to provide period-accurate images of clothing from the 1800s. It's value proposition is the accuracy and addition information provided by a pair of experts from their compiled research. Carma de Jong Anderson, and Lorie Davis. This information is presented in tiles with the picture, description, and additional details. It's intended for artists, authors, historians, and costume designers to have correct information for their research and projects.

In this readme, we'll briefly note the site's bumpy version history. Following, some information on the structure and features of the site in this incarnation, including the file structure and technology used. Finally, we'll layout a few possible directions that the site can be taken in for improvement.

## History

The site began it's life as a group project in the Computer Science area of Utah Valley University. The initial site had many problems: it had little input from UX design, links that broke the CSS if pressed in a certain combination, and a database written in some inscrutable form of PHP that sometimes simply refused to load. Add to that, the actual content was what the client wanted presented, and the quality of the images used was low. There was also absolutely no documentation of the structure, setup, functions, or technology used in the code.

Version 2 of the site began as a desire from the client for a backend to be added to add additional entries. But it was quickly apparent to the Digital Media group (also at UVU) who took on the project that giving the ability to add entries to a site who looked and worked so poorly would be pointless. That idea was scrapped, and the effort of v2 was to simply revise the site in simple HTML and CSS with a few small vanilla JavaScript functions to fix all broken links, and load the clothing images and their information promptly. The styling was only simply revised, and little consideration was taken into true UX design: the goal was simply to get a working product out the door.

By the end of version 2, a working version was completed and uploaded to Bluehost where 1800clothing.org is hosted, but it was clear to the developers of this version (that's us) that a lot more would need to be to move the site from "working" to "usable". Thus, this version, Version 3.

## Structure and Features

### Design

//Emma here

### Technologies

The main site was built in [Svelte](https://svelte.dev/), a modern and very fast JavaScript framework that compiles all of it's simplified language into vanilla JavaScript, CSS, and HTML. Svelte, similar to React, works best be as components nested together. It serves the site from the src folder, and compiles into the public folder, which is where the site is served when deployed.

Database: 


### Structure




## Future Enhancements

* True database
* Backend to update DB
* Applied SEO
* Improved mobile functionality

