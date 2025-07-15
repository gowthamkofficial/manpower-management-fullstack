export enum ApiEndpoints {
  // Session
  SIGN_IN = 'session/signin',

  // Employee
  CREATE_EMPLOYEE = 'employee/createEmployee',
  UPDATE_EMPLOYEE = 'employee/updateEmployee', // requires {id}
  GET_EMPLOYEE_BY_ID = 'employee/getEmployee', // requires {id}
  GET_ALL_EMPLOYEES = 'employee/getAllEmployee',

  // Department
  CREATE_DEPARTMENT = 'departments/create',
  UPDATE_DEPARTMENT = 'departments/update', // requires {id}
  CHANGE_DEPARTMENT_STATUS = 'departments/status', // requires {id}
  DELETE_DEPARTMENT = 'departments/delete', // requires {id}
  GET_DEPARTMENT_BY_ID = 'departments', // requires {id}
  GET_DEPARTMENTS = 'departments', // requires {id}

  // Dashboard
  DASHBOARD_TOP_PAID = 'dashboard/top-paid',
  DASHBOARD_LOWEST_PAID = 'dashboard/lowest-paid',
  DASHBOARD_EMPLOYEE_BY_DISTRICT = 'dashboard/employee-by-district',
  DASHBOARD_DEPARTMENT_COUNT = 'dashboard/department-count',
}
