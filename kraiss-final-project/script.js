const taskForm = document.getElementById('taskForm'); // form element
const taskManager = document.getElementById('taskManager'); // task manager div stores task list
let tasks = []; // task list
let taskIndex = 0; // track index numbers of tasks

window.addEventListener('load', function () {

    // func to print tasks to console
    function logTasks() {
        console.log(JSON.stringify(tasks, null, 1));
    }

    // func to render tasks on page
    function renderTasks() {
        taskManager.innerHTML = ''; // 'refresh' div each time so tasks aren't repeated 

        // create div and elements for each task
        tasks.forEach((task) => {
            // create div to store each task
            const taskDiv = document.createElement('div');
            taskDiv.classList.add("taskDiv"); // class for CSS styling

            // create task name and date elements
            const taskName = document.createElement('p');
            const priorPara = document.createElement('p');
            const datePara = document.createElement('p');
            taskName.textContent = (task.userTask);
            priorPara.textContent = (task.priority);
            datePara.textContent = (task.date);

            // if important then red
            if (task.isImportant) {
                taskDiv.classList.add("important"); // class for CSS styling
            }

            const priority = document.getElementById('priorSel').value;

            // color code task divs based on priority
            switch (task.priority) {
                case 'High':
                    taskDiv.style.backgroundColor = '#FFA5000f'; // yellow
                    break;
                case 'Medium':
                    taskDiv.style.backgroundColor = '#9ACD320f'; // green
                    break;
                case 'Low':
                    taskDiv.style.backgroundColor = '#4169E10f'; // blue
                    break;
            }

            // create "done" checkbox and label and group them in a div for CSS styling
            const isDoneCheckbox = document.createElement('input');
            const isDoneLabel = document.createElement('label');
            const doneDiv = document.createElement('div');
            isDoneCheckbox.type = 'checkbox';
            isDoneCheckbox.checked = task.isDone; // update isDone property of task object
            isDoneLabel.textContent = 'Done';

            // define unique label for each so clicking the label works correctly
            isDoneCheckbox.id = 'isDone' + task.id;
            isDoneLabel.htmlFor = isDoneCheckbox.id;

            // append elements to div
            doneDiv.append(isDoneCheckbox, isDoneLabel);

            if (task.isDone) {
                taskDiv.classList.add('done');
            }

            // func to toggle styling when task marked as done
            isDoneCheckbox.addEventListener('change', () => {
                task.isDone = isDoneCheckbox.checked;
                if (task.isDone) {
                    taskDiv.classList.add('done');
                } else {
                    taskDiv.classList.remove('done');
                }
                logTasks();
                renderTasks();
            });

            // create delete task button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            // func to delete task
            deleteBtn.addEventListener('click', () => {
                tasks = tasks.filter((t) => t.id !== task.id); // remove task by filtering array to tasks without this id number; from ChatGPT
                logTasks();
                renderTasks(); // display filtered array
            });

            // append and render elements on page
            doneDiv.append(isDoneCheckbox, isDoneLabel);
            taskDiv.append(taskName, priorPara, datePara, doneDiv, deleteBtn);
            taskManager.appendChild(taskDiv);
        });

        // sort tasks by priority and completion
        let sortBtn = document.getElementById('sortBtn');

        // Define sort order for priority
        // from ChatGPT
        const priorityOrder = {
            High: 1,
            Medium: 2,
            Low: 3
        };

        // func to sort tasks array
        // from ChatGPT
        sortBtn.addEventListener('click', () => {
            tasks.sort((a, b) => {
                if (a.isDone !== b.isDone) {
                    return a.isDone - b.isDone; // Move completed tasks to end
                }
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            renderTasks();
        });
    }

    console.log('Page loaded');

    // dark mode
    let darkBtn = document.getElementById('darkBtn');
    let body = document.getElementById('body');

    darkBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        taskManager.classList.toggle('dark');
    });

    // get form data
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // console.log('Form submitted');

        // define variables
        const userTask = document.getElementById('userTask').value;
        const priority = document.getElementById('priorSel').value;
        const isImportant = document.getElementById('isImportant').checked;
        const isDone = false;
        // display date as month and day only
        const date = new Date().toLocaleDateString("en", {
            month: "short",
            day: "numeric"
        });

        // create task object
        const task = {
            id: taskIndex++,
            userTask,
            priority,
            isImportant,
            isDone,
            date
        };

        tasks.push(task); // add task to array
        logTasks(); // print tasks array to console log
        renderTasks(); // render tasks array on page as list
        taskForm.reset(); // clear form
    });
});
