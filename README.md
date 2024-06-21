# Clone Project and Setup
Follow these steps to clone the project and set it up on your local machine:
- `Clone the Repository:`
  - Open a terminal or command prompt.
      ``` 
      git clone <repository_url>
      ```
  - Use the git clone command to clone the repository. Replace `<repository_url>` with the URL of the git repository you want to clone:
- `Open the Project:`

  - After cloning the project, open it in your preferred code editor.
- `Install Dependencies:`
    
  - Navigate to the `Front` and `Server` directories and install the necessary packages:

   - Front:
      ```
      cd front
      npm install
      ```

   - server :
      ```
      cd server
      npm install
      ```
   
  - Run the front:

     ```
      cd front
      npm run dev
     ```
   - Run the server:

     ```
      cd server
      npm run dev
      ```
- `Setting Up Environment Files` :
   - `Front` :
       - Open `front` directory
       - Create a `.env` file:
         ```
         .env
         ```
       - Open the `.env` file in a text editor and add the following environment variables:
         ```
          REACT_APP_SUPABASE_URL=your-supabase-url
          REACT_APP_SUPABASE_KEY=your-supabase-key
         ```
   - `Back-End`
      - Open `server` directory
      - Create a `.env` file:
         ```
         .env
         ```
      - Open the `.env` file in a text editor and add the following environment variables:
         ```
         SUPABASE_URL=your-supabase-url
         SUPABASE_KEY=your-supabase-key
         PORT=port-number
         ```
# Note App Teachnical Assignment Document

- This document describes the technical details of my ``Notes App``. The application is a web-based solution that allows users to manage their personal notes efficiently.Below are the key features and functionalities :-

## Frontend (React.js && Tailwinde CSS) :-

- ``Front`` :
  Using ``React`` i have manage ``Dynamic`` and responsive user interface. User can perform a ``Login``, ``Registration``, and ``CRUD ``opration for notes.

- ``CSS Framework `` : I am using ``Tailwind CSS `` for styling my frontend to maik it atractive..

- ``Icons`` :
  ``Lucide-react icons`` used for various ``UI`` elements.A collection of icons optimized for React, making it easy to include scalable vector icons in your project.

- ``Routing`` :
   React Router for navigation between different pages.

- ``Validation`` :
   Impliment input validation and error handling. To handling to error i am using ``Zod.`` Zod is a TypeScript-first schema declaration and validation library. ensuring data integrity through runtime validation, It allows you to ``Define schemas`` for your data structures and provides ``Powerful validation`` and parsing capabilities. it also used in Javascript. 

- ``Data Handling`` :
   The app uses sorting and filtering functionalities to manage notes.

## Backend (Node js)

- Using ``Node js`` for a backend to create ``APIs handling authenticated and CRUD opration for notes``.

- Impliment user registration ,login , notes add, delete,edit view functionality ``API ``.

- Also backend communicate to ``Supabse`` for ``databse opration`` using sdk.

- User can only ``access their owan notes.``

## Databse (Supabase)

- Use supabse as the ``databse`` for user user information and notes.

- configure the ``nodejs API to communicate with supabse`` sdk.

-Create two table for one is store ``user data `` and second one is store ``notes data``

- Stores the userId as a ``foreign key``, linking it to the user who created notes.

- Only authenticated users can create or fetch notes.

- When creating or fetching notes, the user's ID is used to ensure they can only access their own notes.

## Package
   - Here which pakage i have used in my teachnical assignment which definde below :-

  ### Frontend 
   - ``Axios`` : 
       A promise-base HTTP client for maiking requests to API(Application Programming Interface).it is simplifiles the process of sending HTTP request to REST endpoints.

   - ``crypto-js`` :
         A library of cryptographic algorithams, providing functionalities such as encription, hashing, decryption, and more.

   - ``lucide-react`` :
         A collection of icons optimized for React, making it easy to include scalable vector icons in your project.

   - ``react`` :
         he core library for building user interfaces in a component-based architecture, allowing for efficient and flexible UI development

   - ``react-dom`` :
         Provides DOM-specific methods for rendering components and managing the DOM, bridging React with the browser's DOM.

   - ``react-router-dom`` :
        A library for routing in React applications, enabling navigation between different components and pages.

   - ``react-toastify`` :
        A library for creating customizable toast notifications in React, enhancing user feedback with alerts.

   - ``sweetalert2`` :
       A beautiful and customizable replacement for JavaScript's alert, providing enhanced alert messages and modals.

   - ``zod`` :
      A TypeScript-first schema declaration and validation library, ensuring data integrity through runtime validation.

   - ``zustand`` :
       A small, fast, and scalable state management library for React applications, providing a simple API for managing state.

   - ``tailwindcss`` :
       Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.
  
  ### Backend 
   - ``supabase/ssr`` :
       Provides server-side rendering utilities for Supabase projects, facilitating the rendering of React components on the server side for improved performance and SEO. 

   - ``supabase/supabase-js`` :
       Official JavaScript client for Supabase, offering a simple API for interacting with Supabase services such as authentication, database, and storage.

   - ``cookie-parser`` :
        Middleware for parsing cookies in Express, allowing easy access to cookie data in your Node.js applications.

   - ``cors`` :
        Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express, enabling your server to accept requests from other domains.

   - ``dotenv`` :
        Loads environment variables from a .env file into process.env, simplifying the management of environment-specific configurations.

   - ``express`` :
         Web framework for Node.js, simplifying the creation of web applications with features like routing, middleware, and request handling.

   - ``zod`` :
        A TypeScript-first schema declaration and validation library, ensuring data integrity through runtime validation

   - ``nodemon`` : Nodemon is tool that helps in development by automatically restarting the Node.js application when file changes are detected. This is useful for a smoother development workflow without needing to manually restart the server
   
   - Whene used nodemon then add script in package.json
      ```
      "dev": "nodemon index.js",
      "start": "node index.js"
      ```
   
## Frontend Impliment
  - This is the overview of my ``Notes Project``.Explain it below.

      ### Set Up Environment Variables
      - Create a .env file in the root of the project:
      - Open the .env file in a text editor and add the following environment variables
      - `VITE_API_BASE_URL` : youre-backend-api-url
      - `VITE_SECRET_KEY`: youre-secret-key

      ### User Registration
      - ``Form Field`` : User form field with ``Firstname``, ``Lastname``, ``Email`` and ``Password``.

      - ``Validation with Zod`` : Zod is used for form validation to ensure the correctness and security of the data entered by the user. Zod is a TypeScript-first schema declaration and validation library that ensures the user inputs are valid and meet the specified criteria before processing.

      - ``Email Confirmation`` : 
          - After registration, an email is ``sent`` to the user provided ``email address for confirmation``. 

          - Open a email and clik in ``"Confirm your mail."``

          - Once confirmed, you are redirected to the Notes website
      ### User Login
       - Enter Email and Password to log in.

       - ``Validation with Zod`` : Zod is used for form validation to ensure the correctness and security of the data entered by the user. Zod is a TypeScript-first schema declaration and validation library that ensures the user inputs are valid and meet the specified criteria before processing.
       
       - ``Remember Me Option`` :
         - If checked, login details are saved for the next visit, so you don't need to re-enter them.

       - ``Authentication`` :
          - The login process is secured with authentication.

          - After successful login, you are redirected to the dashboard.

      ### Dashboard
      - ``Search Input`` :
         - Used to search notes by title.
      - ``Filter Dropdown`` :
         - Options to filter notes by All notes, pinned or unpinned status.
         - ``All Notes`` showing both pinned or unpinned notes.
         - ``Pinned`` showing only pinned notes.
         - ``Unpinned`` showing only unpinned notes.
 
      - ``Add Notes Button`` :
         - Allows you to add new notes.
      ### Managing Notes
      - ``Validation with Zod`` : Zod is used for form validation to ensure the correctness and security of the data entered by the user. Zod is a TypeScript-first schema declaration and validation library that ensures the user inputs are valid and meet the specified criteria before processing.
      - ``Add Notes`` :
        - Notes are displayed in a visually appealing manner after adding.
      - ``Pin/Unpin Notes`` :
        - Pinning a note moves it to the top.
        - Unpinning a note moves it to the last position.
      - ``Edit Notes`` :
        - Click on the edit button to modify the note's content or title.
      - ``Remove Notes`` :
        - Click on the remove button to delete the note.
      - ``Preview Notes`` :
        - Click on a note to view its details.
      ### Filtering and Searching Notes
      - ``Filter by Pinned/Unpinned`` :
         - Select ``Pinned`` to view all pinned notes.
         - Select ``Unpinned`` to view all unpinned notes.
         - Select ``All notes`` to view both pinned and unpinned notes.
      - ``Search by Title`` :
         - Enter a title in the search input to find specific notes.
      ### User Profile and Logout
      - ``User Profile`` :
         - Click on name at the top right corner.
         - Options: ``Profile and Signout.``
            - ``Profile`` : Opens a popup displaying user details: First Name, Last Name, Email, Joining Date, Email Confirmation Date, Last Sign-In.
            - ``Logout`` : Click on "Logout" to sign out and be redirected to the login page.

## Backend Impliment
### Backend Setup
   - ``Database`` :
      - Supabase
   - ``Backend`` :
      - Node js
      - Express.js 
   
      ### Set Up Environment Variables
      - Create a .env file in the root of the project:
      - Open the .env file in a text editor and add the following environment variables:-
      - `SUPABASE_URL` = your-supabase-url
      - `SUPABASE_KEY` = your-SUPABASE_KEY
      - `PORT` = your-PORT
      - `webUrl` = your-webUrl


      ### Supabase Setup   
      - Register with email and create a project.
      - Create ``Two`` tables in the public schema:

       - ``Profile Table Fields`` :   
          - `id`: Authenticated user ID.
          - `created_at`: Time of user entry in the table.
          - `first_name`: User's first name.
          - `last_name`: User's last name.
          - `email`: User's email.

       - ``Notes Table Fields`` :
          - `id`: Unique ID for the table.
          - `created_at`: Time of notes entry.
          - `title`: Notes title.
          - `content`: Notes content.
          - `user_id`: Reference to the user who created the notes.

      ### Creating a Trigger
      - Triggers are used to automatically execute a set of actions on table events such as `INSERTs`, `UPDATEs`, `DELETEs`, or `TRUNCATE` operations.

         ```
         create or replace function handle_new_user () 
            returns trigger 
            language plpgsql 
            security definer
            set search_path = '' 
            as $$ 
            begin 
            insert into public.profiles (id, first_name, last_name, email) 
            values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', new.email); 
            return new; 
            end; 
            $$;

            create or replace trigger on_auth_user_created
            after insert on auth.users 
            for each row 
            execute procedure public.handle_new_user();
         ```

   
      ### API Development
      - ``Required Packages`` :
         - @supabase/ssr
         - @supabase/supabase-js
         - cookie-parser
         - cors
         - dotenv
         - express
         - zod
  
      ### Creating a Supabase Client:
      - the Supabase client for server-side rendering (SSR).
      - Uses `createServerClient` to create a Supabase client with custom cookie handling for SSR.

      ### Main Server File (index.js)
      - This file sets up the Express server and uses the defined routes.

      - ``Middleware Setup`` : Uses `cors`, `cookieParser`, and `express.json()` middleware.

      - ``Route Setup`` : Uses `/api/users` for user routes and `/api/notes` for note routes.

      - ``Server Start`` : Listens on the specified port and logs a message when the server is running.
   
      ### Routes
       ### User Routes
        - This file defines the routes for user-related operations.

        - ``POST/registration`` : Route for user registration.

        - ``POST/login`` : Route for user login.

        - ``POST/logout`` : Route for user logout.
       
       ### Notes Routes
       - This file defines the routes for note-related operations.
       
       - `POST/` : Route for creating a note.
       - `GET/` : Route for fetching notes.
       - `PATCH/:id` : Route for updating  notes.
       - `DELETE/:id)` : Route for deleting notes.
       - `POST/pinned/:id` : Route for pinning/unpinning a note..
   
      ### Controller 
       ### User Controller

      - This file contains the logic for user-related operations such as registration, login, and logout.

      - `registration` : User registration with email and password. The password was hashing by supabase and sent a confirmation email.
      - `login` : User login with email and password. Whene user login then set cookies by server side.
      - `logout` : User logout.Whene user logout then cookies clear

      ### Notes Controller
        - This file contains the logic for note-related operations such as creating, fetching, updating, deleting, and pinning/unpinning notes.

        - `createNote` : User using this api create a notes to title and content
        - `fetchNotes` : Fetching notes for a user.
        - `updateNotes` : User update notes for using title and content.
        - `delteNotes` : User delete the note by using notes uniq id.
        - `notesPinne` : User pinning/unpinning the notes.
   
  

      
