Question: Implementing CRUD Operations for Git Commits

You are asked to build a Node.js application to manage Git commits from an author for a particular repository. Your application should provide CRUD (Create, Read, Update, Delete) operations for handling commits. Below are the requirements:
Schema Design:
Design a schema to represent a Git commit. Include fields for:
message (commit message)
author (commit author)
timestamp (commit timestamp)
repo (commit repo)
commit id

Create Operation:
Implement a function to add a new commit to the database. The function should take commit details (message, author, timestamp, repo) as parameters and insert the commit into the database.

Read Operation:
Implement a function to retrieve commits based on a specific time interval, author, and repo. The function should take two timestamps as input with repo and author and return all commits made within that interval.

Update Operation: (Optional, can be excluded if time is limited)
Implement a function to update the message of a commit based on its ID.

Delete Operation:
Implement a function to delete a commit based on its ID.
Guidelines:
Use any database you choose (e.g., MongoDB, MySQL, etc.).
Ensure error handling
Write clean and readable code, and comment where necessary.
Consider edge cases such as invalid inputs, non-existent commits, etc.
