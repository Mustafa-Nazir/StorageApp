⚠ [to reach the front-end project](https://github.com/Mustafa-Nazir/storage-app-fe)

# 📄About The Project
This project is a **SaaS** application that allows institutions to store and manage their data.

# 💻Used Technologies
|Technologies|
|:---:|
|Node.js|
|Express.js|
|TypeScript|
|MongoDB|
|Mongoose|
|Git|
|TSyringe|
|Firebase|
|Redis|
|gRPC|

# 🔑Features
* Login/Register
* Every user can create their library and invite their team members.
* A notification is sent to users to accept or reject the library invitation.
* The project has role and department-based authorization. There are three roles in the project (owner, admin, user), and departments can be created dynamically.
* Users can create announcements and share them publicly or within their department.
* Users can create folders in the public or department folders and upload their files.
* The dashboard section has a daily file upload graphic, as well as graphics showing file size and amount by user and department.
* The owner role can see all department folders, files, and announcements, and can delete any file or announcement.
* The admin and user roles can see only their department's folders, files and announcements. Admins can delete them, while users can delete only their own.
* The user roles can't access the dashboard and settings sections.

# 🧱Architecture and Design
* The project has an **N-Layer** architecture and includes the **Models, Core, Data Access, Business,** and **API** layers.

## Request and Response Process
![](ApplicationImages/request_response.png)

## Microservice Design
![](ApplicationImages/microservices.png)

## Github Design
![](ApplicationImages/github_design.png)