
IE Coding Challenge Test Project
- Garrett Trojanek, January 2nd 2025

"Instructions for how to run your program":

Pull the IE-Test repository from GitHub to your local machine
Load the IE-Test folder as a workspace into Visual Studio Code (or other IDE)
In a new console, run 'npm install' (Note: will need to install node if not already installed, as well as proper terminal tools. (Tested on two different Macs)
Open the index.html file in Google Chrome
View data, start typing in the filter/search input box to filter/search the database, click the green button to create/insert a new item, the blue button to edit an existing item, or the red button to delete an item from the inventory


"An overview of design decisions":
With pretty basic requirements and the potential for a larger data pool, I wanted to keep the web app as clean and simple as possible, while being easy to read and manage. The layout/design I settled on made for an easily adjustable or changeable basic layout, while meeting all MVP requirements, as well as the nice-to-have full CRUD options. 


"What languages you picked and why":

Vanilla JavaScript/HTML:  For most common use in web applications and I have experience with it more than others. It is also more easily translatable to a JS framework in the future.
SQL: For the relational database requirements (Postgres used via Supabase for free online hosting)
CSS/Bootstrap: Bootstrap library/template used for styling and clean efficient look and good industry practices


"Your process for verifying the correctness of your program":

	I tested all features and inputs repeatedly using different scenarios and if I came across anything that needed adjusting, I kept a running list going of what to watch out for and update. As things were fixed, I made sure to go back to other features, even if they were previously working. Without knowing much about the database and a limited sample size, it was hard to know if there were any data rules or input validation required, so I only implemented checking for symbols and preventing that input, as I didn't see any of that in the sample data. Otherwise, I would add more data validation and tests for things like IDs containing only numbers and/or letters, length requirements, formatting rules, etc.


"What didn't you get to, or what else might you do with more time?":

	If I had more time, I would probably try creating this using a framework such as React or Angular since that is what IE uses and it would be a good learning opportunity (which I may still also play around with after the fact). 
I also would spend more time making the site more responsive to fit different viewports/screen sizes and be mobile friendly using more flexbox and other tools outside of the Bootstrap styling template/library. I would have maybe also spent some time using Chrome's developer tools to inspect the IE website for their design scheme and copied some of it within the application, such as fonts, colors, etc. As noted above, it was hard to determine any rulesets to use around data validation in the database with a small sample size, but with more time and data I would implement more data input validation and error-checking to ensure the correct information was entered into each category, like length/format requirements and more. This could also include creating some actual JS tests to use going forward. Lastly, if I spent more time or took this further, I could clean up the code a little bit, including combining some functions creatively to reduce the lines of code and redundancy. There were just a few lines left commented out so I could continue working on the project and as reminders to myself as well, which would normally be removed.
