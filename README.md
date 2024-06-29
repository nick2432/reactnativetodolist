# ToDoList App

A simple and intuitive to-do list application built using React Native. The app allows users to add, manage, and delete tasks, helping them stay organized and productive.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new tasks with descriptions and due dates.
- Mark tasks as completed or uncompleted.
- Edit or delete existing tasks.
- Simple and user-friendly interface.
- Persistent data storage.

## Screenshots

![Home Screen](screenshots/home.png)
![Add Task](screenshots/add_task.png)
![Task List](screenshots/task_list.png)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/todolist-react-native.git
    cd todolist-react-native
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Link dependencies:**
    ```bash
    npx react-native link
    ```

4. **Run the application:**
    ```bash
    npx react-native run-android   # For Android
    npx react-native run-ios       # For iOS
    ```

    > **Note:** Ensure you have an Android or iOS emulator running, or connect a physical device.

## Usage

1. **Open the app** on your device or emulator.
2. **Add a new task** by tapping the "Add Task" button.
3. **Fill in the task details** and save.
4. **Manage tasks** by tapping on them to mark as completed or by swiping to delete.

## Technologies Used

- **React Native**: Framework for building native apps using React.
- **Redux**: State management library for React applications.
- **React Navigation**: Routing and navigation library for React Native.
- **AsyncStorage**: For local data persistence.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch with your feature or bug fix.
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes.
    ```bash
    git commit -m "Add some feature"
    ```
4. Push to the branch.
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

Please ensure your pull request adheres to the following guidelines:
- Describe your changes clearly.
- Include screenshots if the changes affect the UI.
- Ensure your code passes linting and tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
