## GraphQL API

#### Show all Projects

```graphql
{
  projects {
    name,
    description,
    id,
    clientId,
    status
  }
}


```

#### Output

```
{
  "data": {
    "projects": [
      {
        "name": "mobile application",
        "description": "with flutter",
        "id": "65db3a868e06d955a81a00a4",
        "clientId": "65db379911fa58dae6cf96f2",
        "status": "Completed"
      },
      {
        "name": "robot",
        "description": "robot maker",
        "id": "65db4ff26f58127aa12ec946",
        "clientId": "65db379911fa58dae6cf96f2",
        "status": "no Started"
      }
    ]
  }
}
```

#### Show all Clients

```graphql
  {
  clients {
    name,
    email,
    phone
  }	
}

```

#### Output

```
{
  "data": {
    "clients": [
      {
        "name": "John",
        "email": "John@gmail.com",
        "phone": "22-22-22"
      },
      {
        "name": "jack",
        "email": "jack@gmail.com",
        "phone": "33-33-33"
      },
    ]
  }
}
```

#### mutation to add a new project

```graphql
mutation {
  addProject(name: "robot", description: "robot maker", clientId: "65db379911fa58dae6cf96f2",status: new) {
    name,
    description,
    id,
    clientId,
    status
  }
}

```

#### Output

```
{
  "data": {
    "addProject": {
      "name": "robot",
      "description": "robot maker",
      "id": "65db4ff26f58127aa12ec946",
      "clientId": "65db379911fa58dae6cf96f2",
      "status": "no Started"
    }
  }
}
```

#### mutation to add a new client

```graphql  
mutation {
  addClient(name: "jack", email: "Jack@gmail.com", phone: "33-33-33") {
    name,
    email,
    phone
  }
}
    
```

#### Output

```GraphQL
    {
    "data": {
        "addClient": {
        "name": "jack",
        "email": "Jack@gmail.com",
        "phone": "33-33-33"
        }
    }
    }
    ```

#### mutation to update a project

```graphql
mutation {
  updateProject(id: "65db4ff26f58127aa12ec946", status: "Completed") {
    name,
    description,
    id,
    clientId,
    status
  }
}
```

#### Output

```GraphQL
{
  "data": {
    "updateProject": {
      "name": "robot",
      "description": "robot maker",
      "id": "65db4ff26f58127aa12ec946",
      "clientId": "65db379911fa58dae6cf96f2",
      "status": "Completed"
    }
  }
}
```

#### show one client has how many projects

```graphql
{
  client(id: "65db379911fa58dae6cf96f2") {
    name,
    email,
    phone,
    projects {
      name,
      description,
      id,
      status
    }
  }
}
```

#### Output

```GraphQL
{
  "data": {
    "client": {
      "name": "John",
      "email": "John@gmail.com",
        "phone": "22-22-22",
        "projects": [
          {
            "name": "mobile application",
            "description": "with flutter",
            "id": "65db3a868e06d955a81a00a4",
            "status": "Completed"   
            },
            {
            "name": "robot",        
            "description": "robot maker",       
            "id": "65db4ff26f58127aa12ec946",       
            "status": "Completed"     
            }   
        ]   
    }
}
}
```


