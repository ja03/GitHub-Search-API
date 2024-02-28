# Work4all - Coding Challenge

# The Project

GitHub User Search Progressive Web App (PWA) built with ReactJS and TypeScript!

## Key features

-   Search for GitHub users
-   Mark users as favorites
-   View detailed information about each user

## Tools Used

-   React with TypeScript
-   Git
-   React router
-   Tailwind CSS
-   Vite PWA plugin & PWA Assets Generator plugin

## Installation

1. **Clone the repository:**

    ```powershell
    git clone https://github.com/ja03/GitHub-Search-API
    ```

2. **Install Dependencies:**

    ```powershell
    cd github-user-app
    cd github-user-app
    npm install
    ```

3. **Run the app:**

    ```powershell
    npm run preview
    ```

Read on for more information about my working approach. 📖

# Working approach

First, I started by writing down all the key features of the application, analysing each feature, and googling the resources I needed to use to complete this task. After that, I had a clear and general idea of what I was going to build. Using my whiteboard, I wrote the main structure of the app and how components would communicate with each other.


## Building the app

-   I created a React application using **`Vite`** for a fast and efficient environment for development.
-   After that, I installed the libraries I would use. **`Tailwind CSS`** to speed up the development process by using it’s amazing utility classes, and **`Reacr-router-dom`** for smooth navigation in the app.
-   Then I initialized a local **`git`** repo in the project directory to handle different versions of the project.

> The way I was haniling new features, each feature had its own branch. That’s where **`git`** helped me the most, I isolated features from each other then merged them with the master branch.

Now that I have everything installed, I made a simple file structure in my notebook to organize my files.

-   In the layout folder, I implemented a general layout that will be passed to the parent route in the **`App.tsx`** to group child routes inside a specific layout.
-   In the pages folder, I had the main pages that I would be navigating to. **`Search.tsx`**, **`Favoritos.tsx`**, and **`404.tsx`**.
-   The components folder had the components that I will be using frequently to handle reusable code.
-   The utils folder had files called **`helper.ts`** containing the functions I would be using on each page and a file named **`types.ts`** that stored the special data types I would use in my code. The reason for this folder is to separate handlers, functions, and types from the JSX


## Handling Routes

I created a constant variable that will store the routes. With the method **`createBrowserRouter`** to provide a more explicit and flexible approach to defining and managing routes and the method **`createRoutesFromElements`** to create routes as JSX instead of objects. Each page I wanted to navigate to, I passed it as an element to the **`Route`** component, with a special path related to it.

```tsx
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/">
                <Route index element={<Search />} />
                <Route
                    path=":username"
                    element={<UserDets />}
                    loader={userDetailsLoader}
                />
            </Route>
            <Route path="/favoritos">
                <Route index element={<Favoritos />} />
                <Route
                    path=":username"
                    element={<UserDets />}
                    loader={userDetailsLoader}
                />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Route>
    )
);
```

I passed the router I made to the **`RouteProvider`** to render the app.

```tsx
return (
    <>
        <RouterProvider router={router} />
    </>
);
```

## GitHub API

When reading about the GitHub API, especially the user search API, I came across two endpoints: one I used to render a list of users, which is used in the search page, and another I used to display the user details.

### Users search API

I started by creating a special type named **`User`** that I used to pass on props of type **`User`** to child components. I used this type to handle the data coming from the API so I could store it in a state of type **`Array<User>`**.

```tsx
// in types.ts
export type User = {
    user_avatar: string;
    user_login: string;
    user_full_name: string;
    user_bio: string;
    user_followers: number;
    user_following: number;
    user_public_repos: number;
};
```

In **`Search.tsx`**, I created a state named **`searchInput`** that stores the queries the user types, which I use to pass as a parameter for a function named **`getUsers`** that fetches the data from the API. And another state named **`fetchedData`** where I store the data coming from the API

```tsx
// in search.tsx
const [searchInput, setSearchInput] = useState<string>("");
const [fetchedData, setFetchedData] = useState<Array<User>>([]);
```

```tsx
// in helper.tsx
export const getUsers = async (q: string, page: number): Promise<unknown> => {
    return fetch(
        `https://api.github.com/search/users?q=${q}&per_page=15&page=${page}`
    )
        .then((r) => r.json())
        .then((d) => {
            let usersArr = d.items.map((i: any) => {
                let userObj: User = {
                    user_avatar: i.avatar_url,
                    user_login: i.login,
                    user_full_name: "",
                    user_bio: "",
                    user_followers: 0,
                    user_following: 0,
                    user_public_repos: 0,
                };
                return userObj;
            });
            return usersArr;
        })
        .catch((e) => console.warn(e));
};
```

Here in the function, I iterate over the array of objects coming from the API, store the data I need in an array of objects, and return it. To call the **`getUsers`** function every time the **`searchInput`** changes, I used the **`useEffect`** hook. By storing the **`searchInput`** in the dependesis array, I kept track of the changes occurring to **`searchInput`**

```tsx
useEffect(() => {
    if (searchInput.length === 0) {
        setFetchedData([]);
    } else if (searchInput.length >= 3) {
        (async () => {
            const users = await getUsers(searchInput, currentPage);
            if (users) {
                setFetchedData(users as Array<User>);
            }
        })();
    }
}, [searchInput]);
```

You may also notice that I have an if statement that checks if the search input is empty and clears the **`fetchData`** state, and when the input has at least three characters, it calls the **`getUsers`** function

### Rendering the data

Object stored in the **`fetchedData`** I iterate over them using the map method, and I render for each object a **`UserCard`** component.

```tsx
// in Search.tsx
<div className={`flex flex-col items-center justify-top py-4 h-[600px]`}>
    <div onScroll={handleScroll} className="overflow-y-scroll">
        <div
            className={
                fetchedData.length > 0
                    ? "w-[600px] flex flex-col items-center p-2 pb-0 space-y-4 rounded-lg shadow-md bg-white"
                    : ""
            }>
            {fetchedData.length > 0 ? (
                fetchedData.map((user) => {
                    return (
                        <div
                            className="w-full flex flex-col "
                            key={user.user_login}>
                            <UserCard userData={user} />
                            <div className="w-full h-[2px] bg-[#D9D9D9] mt-2 mx-auto"></div>
                        </div>
                    );
                })
            ) : (
                <>
                    <p className="text-[14px]">No search results...</p>
                </>
            )}
        </div>
    </div>
</div>
```

I pass in the user object to the **`UserCard`** component, and in there I extract the data of the object to render it.

### UserCard.tsx

The way I designed this component is that I divided it into two sections, one for the **`Link`** component from react-router that opens the user details page. The other section is to handle the favorite state of the user.

```tsx
<div className="flex justify-between items-center h-[64px]">
    <Link
        to={`${userData.user_login}`}
        className="flex-1 flex items-center gap-2">
        <div
            className="rounded-full border-2 w-[60px] h-[60px] grid items-center  bg-cover bg-center"
            style={{
                backgroundImage: `url(${userData.user_avatar})`,
            }}></div>
        <p className="text-[18px]">@{userData.user_login}</p>
    </Link>
    <img
        src={isFav ? filledStarIcon : starIcon}
        alt="filled-star-icon"
        onClick={() => handleClick(userData)}
    />
</div>
```

The way I handle my favorite state has two functions. **`handleFavUser`** and **`handleStarIcon`**

```tsx
export const handleStarIcon = (user: User): boolean => {
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    if (favUsersItem.length > 0) {
        let favUsers: User[] = JSON.parse(favUsersItem);
        return favUsers.some((u) => {
            return u.user_login === user.user_login;
        });
    } else {
        return false;
    }
};
```

This function is used to check if the user is a favorite user or not and return a boolean state. The way it operates is that it takes a user object as a parameter, then we get the **`FavUsers`** item from the local storage; it’s an array of objects that have the favorite users stored there. I get that item and check if it's null or not, then I parse it and iterate over it, using the object-based parameter to check if the user_logain values are the same. The use of the **`some`** method here helps me compare values, not references. I was using the map method, and it didn't work as expected, so I googled the topic and asked a question on stack overflow that had the same error. That’s where I learned about **`some`** method.

```tsx
export const handleFavUser = (user: User): void => {
    // chechk if user in array
    let favUsersItem: string = localStorage.getItem("FavUsers") ?? "";
    let inArray: boolean;
    let favUsers: User[];
    if (favUsersItem.length > 0) {
        favUsers = JSON.parse(favUsersItem);
        inArray = handleStarIcon(user);
    } else {
        inArray = false;
        favUsers = [];
    }
    if (inArray) {
        // pop item
        console.log("removing user");
        let newArr;
        newArr = favUsers.filter((u) => {
            return u.user_login !== user.user_login;
        });
        localStorage.setItem("FavUsers", JSON.stringify(newArr));
    } else {
        // add item
        console.log("adding user");
        favUsers.push(user);
        localStorage.setItem("FavUsers", JSON.stringify(favUsers));
    }
};
```

This function handles the state of the user with a user object sent as a parameter; if the user sent as a parameter is a favorite user and you trigger the function, the user won’t be a favorite user, just as if he wasn’t when the function is triggered, the user will be a favorite user. It starts by getting the item **`FavUsers`** from the local storage and checking if it is null or not. then I created a variable called **`inArray`**; it’s value will determine if the user is a favorite or not. And another array named **`favUsers`** of type **`User`**.

In the function, I have two if-statements: one that will set the value of the **`inArray`** variable by first checking if **`favUsersItem`** has items in it or not, then parsing the JSON data, saving the parsed array in **`favUsers`**, then calling the **`handleStarIcon`** function and passing the user object to it. The other if-statement uses the value of **`inArray`** to remove or add a new user. If the user was already in the array, we will remove it using the filter method that compares the values of the **`user_login`** using the filter method, remove the user, and return a new modified array. The last thing is that it will set the local storage **`FavUsers`** item with the new modified array. If the value of inArray was false, we would add the new user. We do so by pushing the **`user`** object to the **`favUsers`** array and setting the **`FavUsers`** item to the newly modified **`favUsers`** array.

### User details API

Going back to the **`Link`** component in **`UserCard.tsx`**, the **`to`** attribute is set to the **`user_login`** value. I coded it like this so I can implement a loader, which is a function used to fetch data before the component is rendered (it’s a new addition, I believe). I use a loader function called **`userDetailsLoader`** that takes **`params`** as arguments. **`params`** are an object that is automatically provided by the **`react-router`** based on the routes dynamic segment, which is **`:username`** in this case.

```tsx
// in helper.ts
export const userDetailsLoader = async ({ params }: any): Promise<User> => {
    const { username } = params;
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
            const userData = await res.json();
            let userObj: User = {
                user_avatar: userData.avatar_url,
                user_login: userData.login,
                user_full_name: userData.name,
                user_bio: userData.bio,
                user_followers: userData.followers,
                user_following: userData.following,
                user_public_repos: userData.public_repos,
            };
            return userObj;
        } else {
            console.warn("lol api broke again");
            let userObj: User = {
                user_avatar: "",
                user_login: "",
                user_full_name: "",
                user_bio: "",
                user_followers: 0,
                user_following: 0,
                user_public_repos: 0,
            };
            return userObj;
        }
    } catch (e) {
        console.warn(e);
        let userObj: User = {
            user_avatar: "",
            user_login: "",
            user_full_name: "",
            user_bio: "",
            user_followers: 0,
            user_following: 0,
            user_public_repos: 0,
        };
        return userObj;
    }
};
```

The way this function operates is that when the response is okay, I create a new object of type **`User`** and return that object, and using the method **`useLoaderData`** from **`react-router`**, I extract that object and render its data. If the response was not okay, I returned an empty object. I made it like this because I wanted to handle all the coding logic in the helper file.

```tsx
// UserDets.tsx
const [user] = useState<User | any>(useLoaderData());
```

## Pagination

Adding this feature was quite tricky. I tried different ways before finding one that worked. Now, there's a special function called **`handleScroll`** in the **`Search.tsx`** file. It keeps an eye on how you scroll. When you reach the bottom of the page, it automatically updates what you see on the screen.

The first thing I did was create a state named **`currentPage`**, used as an endpoint query **`page`**.

```tsx
// in Search.tsx
const [currentPage, setCurrentPage] = useState<number>(1);

const handleScroll = (event: any) => {
    // console.log(scrollTop)
    const scrollY = event.currentTarget.scrollTop;
    if (Math.ceil(scrollY) >= 500) {
        if (Math.ceil(scrollY) % 500 === 0) {
            setCurrentPage(currentPage + 1);
        }
    }
};
```

I calculate the scrolling position value using **`event.currentTarget.scrollTop`**. With a fixed height of 600 pixels given to the list view rendering the content, I check if the user's scrolling position reaches 500 pixels. The goal of this is to render new items before the user reaches the end of the list view. because the **`scrollY`** value will keep on increasing I added another if statement that updates the **`currentPage`** state when the remainder of dividing the rounded value of **`scrollY`** by 500 is equal to 0. What I’m doing here is that whenever I reach a scrolling position divisible by 500, I render new items, so I don’t just keep rendering items when the **`scrollY`** is greater than 500.

I track changes happening in **`currentPage`** state using useEffect.

```tsx
// in Search.tsx
useEffect(() => {
    currentPage > 1 &&
        (async () => {
            const users = await getUsers(searchInput, currentPage);
            if (users) {
                setFetchedData([...fetchedData, ...(users as Array<User>)]);
            }
        })();
}, [currentPage]);
```

Here, I simply check if the **`currentPage`** is greater than one (so I don’t render new items when the component mounts, causing a 422 response); if so, I call a function named **`getUsers`**

## PAW feature

Although this feature was new to me, I was researching this topic daily, trying to find a valid source of information to learn how to implement it with Vite and React. I came across a very comprehensive document titled **[How to setup a React PWA project using Vite](https://www.saurabhmisra.dev/setup-react-pwa-using-vite/)**, in which I learned how to set up my React application as a PWA app.

The document implemented the PWA feature using **`vite-plugin-pwa`** it will help add PWA to the application with almost zero configuration. \***\*And using **`vite-pwa/assets-generator`\*\* to generate all the icons required for your PWA application.

### Installation

**`vite-plugin-pwa`**:

```powershell
npm i vite-plugin-pwa -D
```

**`vite-pwa/assets-generator`**:

```powershell
npm i @vite-pwa/assets-generator -D
```

### Configuration

In **`vite.config.ts`**, using the help of the **`VitePWA`** function, I added the needed configuration related to the PWA. I started by importing it from the module **`vite-plugin-pwa`**

-   **`registerType: 'autoUpdate’`**: here I tell the service worker to automatically check for updates and update itself in the background.
-   **`includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg']`**: I specify additional assets to be included in the service worker cache.
-   **`manifest`**: I used this object to set the metadata of the application, like it’s name, short name, and the icons displayed on different devices.

### **Generating PWA assets**

In the **`package.json`** file, I added a script that maps to the **`pwa-assets-generator`** command and will kick off the asset generation process.

```tsx
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "generate-pwa-assets": "pwa-assets-generator --preset minimal public/logo.svg"
  },

```

Lastly, with the help of this command, I generate PWA assets.

```powershell
npm run generate-pwa-assets
```

# Conclusion

Thank you for reviewing the documentation on my GitHub user search PWA application. Your insights are valuable, and I am excited about the possibility of aligning my contributions with the goals of Work4All. Please feel free to reach out for any further clarification or to schedule an interview. I appreciate your consideration and look forward to the opportunity to contribute to the success of Work4All.

Best Regards,
Ahmad Mahmoud
