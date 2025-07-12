export enum ApiEndpoints {
  // Session
  SIGN_IN = '/api/session/signin',

  // Employee
  CREATE_EMPLOYEE = '/api/employee/createEmployee',
  UPDATE_EMPLOYEE = '/api/employee/updateEmployee', // requires {id}
  GET_EMPLOYEE_BY_ID = '/api/employee/getEmployee', // requires {id}
  GET_ALL_EMPLOYEES = '/api/employee/getAllEmployee',

  // Department
  CREATE_DEPARTMENT = '/api/departments/create',
  UPDATE_DEPARTMENT = '/api/departments/update', // requires {id}
  CHANGE_DEPARTMENT_STATUS = '/api/departments/status', // requires {id}
  DELETE_DEPARTMENT = '/api/departments/delete', // requires {id}
  GET_DEPARTMENT_BY_ID = '/api/departments', // requires {id}

  // Dashboard
  DASHBOARD_TOP_PAID = '/api/dashboard/top-paid',
  DASHBOARD_LOWEST_PAID = '/api/dashboard/lowest-paid',
  DASHBOARD_EMPLOYEE_BY_DISTRICT = '/api/dashboard/employee-by-district',
  DASHBOARD_DEPARTMENT_COUNT = '/api/dashboard/department-count',
}
