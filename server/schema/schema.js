// mongoose models import
const Project = require('../models/Project');
const Client = require('../models/Client');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql');


const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        clientId: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
});

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({clientId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent, args) => {
                return Project.find();
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, args) {
                const existingClient = await Client.findOne({email: args.email});
                const existingName = await Client.findOne({name: args.name});
                if (existingClient || existingName) {
                    throw new Error('Client Email and name  already exists');
                }
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        // // delete client
        deleteClient: {
            type: ClientType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args) {
                return Client.findByIdAndDelete(args.id);
            }
        },
        // // update client
        updateClient: {
            type: ClientType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, args) {
                const updatedClient = await Client.findByIdAndUpdate(
                    args.id,
                    {name: args.name, email: args.email, phone: args.phone},
                    {new: true} // Bu seçenek, güncellenmiş belgenin döndürülmesini sağlar.
                );

                if (!updatedClient) {
                    throw new Error('No client found with the provided ID');
                }

                return updatedClient;
            }
        },
        // // add project
        addProject: {
            type: ProjectType,
            args: {
                clientId: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'no Started'},
                            inProgress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    }),
                    defaultValue: 'no Started'
                },
                clientId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }

        },
        // // delete project
        deleteProject: {
            type: ProjectType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            }
        },
        // // update project

        updateProject: {
            type: ProjectType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'no Started'},
                            inProgress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    }),
                    defaultValue: 'no Started'
                },
                clientId: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId
                    },
                    {new: true}
                );
            }
        }

    }

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
