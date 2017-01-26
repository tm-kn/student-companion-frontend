Student Companion front-end application
=======================================
This repository contains work on our front-end Angular application.

Setup
-----
Software
  - `Node <https://nodejs.org/>`_ installed. Using version 6.
  - `Ruby v1.9+ <https://www.ruby-lang.org/en/>`_ 
  - You need `Git <https://git-scm.com/>`_ installed on your system to use Bower. If you use Windows, make sure you select an option that adds git command to your PATH during the installation.

.. code-block:: bash

  # Installs Gulp and Bower commands globally (requires administrator permissions)
  npm install -g gulp bower
  
  # Install Sass (required administrator permissions)
  gem install sass

  # Change directory to the project folder
  cd student-companion-frontend

  # Install project local dependencies
  npm install
  bower install

Usage
-----
Use ``gulp`` command in the project's directory in order to compile sass assets.
Use ``npm start`` to start the HTTP server.
