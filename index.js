// Importing necessary modules
const inquirer = require('inquirer');
const connection = require('./db/connection');



// Importing classes for department, role, and employee management
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employe'); 
const Query = require ('./lib/Query');

// Creating instances of the classes with a database connection
const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);
const query = new Query(connection);

// Main menu function for the application
function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Update Employee Manager',
      'View Employees by Manager',
      'View Employees by Department',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'View Department Budget',
      'Exit'
    ]
  })
  .then(answer => {
     // Handling the user's choice
    switch (answer.action) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
        case 'Update Employee Manager':
          updateEmployeeManager();
          break;
        case 'View Employees by Manager':
          viewEmployeesByManager();
          break;
        case 'View Employees by Department':
          viewEmployeesByDepartment();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'View Department Budget':
          viewDepartmentBudget();
          break;
      case 'Exit':
        connection.end();
        break;
      default:
        // Handling invalid input
        console.log("Invalid action");
        mainMenu();
    }
  });
}

// Function to view all departments
function viewAllDepartments() {
  department.viewAllDepartments().then(([rows]) => {
    console.table(rows);
    mainMenu();
  });
}

//Function to view all Roles
function viewAllRoles() {
  role.viewAllRoles().then(([rows]) => {
    console.table(rows);
    mainMenu();
  });
}

//Function to view all Employees
function viewAllEmployees() {
  employee.viewAllEmployees().then(([rows]) => {
    console.table(rows);
    mainMenu();
  });
}

// Function to add a new department
function addDepartment() {
  inquirer.prompt({
    // Prompting for the name of the new department
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?'
  })
  .then(answer => {
    // Adding the new department to the database
    department.addDepartment(answer.name).then(() => {
      console.log(`Added ${answer.name} to the database.`);
      mainMenu();
    });
  });
}

// Function to add a new role
function addRole() {
  department.viewAllDepartments().then(([departments]) => {
    // Mapping department data for selection
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: departmentChoices
      }
    ])
    .then(answers => {
      // Adding the new role to the database
      role.addRole(answers.title, answers.salary, answers.department_id).then(() => {
        console.log(`Added ${answers.title} role to the database.`);
        mainMenu();
      });
    });
  });
}

// Function to add a new employee
function addEmployee() {
  role.viewAllRoles().then(([roles]) => {
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    employee.viewAllEmployees().then(([employees]) => {
      const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      managerChoices.unshift({ name: 'None', value: null });
// Prompting for details of the new employee
      inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager_id',
          message: "Who is the employee's manager?",
          choices: managerChoices
        }
      ])
      .then(answers => {
        employee.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id).then(() => {
          console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`);
          mainMenu();
        });
      });
    });
  });
}

// Function to update an existing employee's role
function updateEmployeeRole() {
  employee.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    role.viewAllRoles().then(([roles]) => {
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        },
        {
          type: 'list',
          name: 'roleId',
          message: "What is the new role?",
          choices: roleChoices
        }
      ])
      .then(answers => {
        employee.updateEmployeeRole(answers.employeeId, answers.roleId).then(() => {
          console.log(`Updated employee's role in the database.`);
          mainMenu();
        });
      });
    });
  });
}
// Function to update the manager of an employee
function updateEmployeeManager() {
  employee.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Select the employee whose manager needs to be updated:",
        choices: employeeChoices
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Select the new manager:",
        choices: employeeChoices
      }
    ])
    .then(answers => {
      query.updateEmployeeManager(answers.employeeId, answers.managerId).then(() => { 
        console.log(`Manager updated for employee ID ${answers.employeeId}`);
        mainMenu();
  
      });
    });
  });
}
// Function to view employees who report to a specific manager
function viewEmployeesByManager() {
  employee.viewAllEmployees().then(([managers]) => {
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'managerId',
      message: "Select the manager to view their employees:",
      choices: managerChoices
    })
    .then(answer => {
      query.findEmployeesByManager(answer.managerId).then(([employees]) => { 
        console.table(employees);
        mainMenu();
      });
    });
  });
}
// Function to view employees within a specific department
function viewEmployeesByDepartment() {
  department.viewAllDepartments().then(([departments]) => {
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: "Select the department to view its employees:",
      choices: departmentChoices
    })
    .then(answer => {
      query.findEmployeesByDepartment(answer.departmentId).then(([employees]) => { 
        console.table(employees);
        mainMenu();
      });
    });
  });
}
// Function to delete a specific department
function deleteDepartment() {
  department.viewAllDepartments().then(([departments]) => {
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: "Select the department to delete:",
      choices: departmentChoices
    })
    .then(answer => {
      query.deleteDepartmentById(answer.departmentId).then(() => {
        console.log(`Department deleted.`);
        mainMenu();
      });
    });
  });
}
// Function to delete a specific role
function deleteRole() {
  role.viewAllRoles().then(([roles]) => {
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'roleId',
      message: "Select the role to delete:",
      choices: roleChoices
    })
    .then(answer => {
      query.deleteRoleById(answer.roleId).then(() => {
        console.log(`Role deleted.`);
        mainMenu();
      });
    });
  });
}
// Function to delete a specific employee
function deleteEmployee() {
  employee.viewAllEmployees().then(([employees]) => {
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'employeeId',
      message: "Select the employee to delete:",
      choices: employeeChoices
    })
    .then(answer => {
      query.deleteEmployeeById(answer.employeeId).then(() => { 
        console.log(`Employee deleted.`);
        mainMenu();
      });
    });
  });
}

function viewDepartmentBudget() {
  department.viewAllDepartments().then(([departments]) => {
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: "Select the department to view its total budget:",
      choices: departmentChoices
    })
    .then(answer => {
      query.viewDepartmentBudget(answer.departmentId).then(([results]) => {
          if (results[0] && results[0].total_budget != null) {
              console.log(`Total Budget: ${results[0].total_budget}`);
          } else {
              console.log('Total Budget: No data available');
          }
          mainMenu();
      });
    });
  });
}


// Start the application by calling mainMenu
mainMenu();
