var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var StudentModel = require("../models/Student");
//
// Create a GraphQL Object Type for Student model
const studentType = new GraphQLObjectType({
  name: "student",
  fields: function () {
    return {
      _id: {
        type: GraphQLString,
      },
      studentNumber: {
        type: GraphQLInt,
      },
      password: {
        type: GraphQLString,
      },
      firstName: {
        type: GraphQLString,
      },
      lastName: {
        type: GraphQLString,
      },
      address: {
        type: GraphQLString,
      },
      city: {
        type: GraphQLString,
      },
      phone: {
        type: GraphQLInt,
      },
      email: {
        type: GraphQLString,
      },
      program: {
        type: GraphQLString,
      },
    };
  },
});
//
// create a GraphQL query type that returns all students or a student by id
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      students: {
        type: new GraphQLList(studentType),
        resolve: function () {
          const students = StudentModel.find().exec();
          if (!students) {
            throw new Error("Error");
          }
          return students;
        },
      },
      student: {
        type: studentType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const studentInfo = StudentModel.findById(params.id).exec();
          if (!studentInfo) {
            throw new Error("Error");
          }
          return studentInfo;
        },
      },
    };
  },
});
//
// add mutations for CRUD operations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addStudent: {
        type: studentType,
        args: {
          studentNumber: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          city: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function (root, params) {
          const studentModel = new StudentModel(params);
          const newStudent = studentModel.save();
          if (!newStudent) {
            throw new Error("Error");
          }
          return newStudent;
        }
      },
      updateStudent: {
        type: studentType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString)
          },
          studentNumber: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          address: {
            type: new GraphQLNonNull(GraphQLString)
          },
          city: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
            return StudentModel.findByIdAndUpdate(params.id, { studentNumber: params.studentNumber,
            password: params.password, firstName: params.firstName, lastName: params.lastName,
            address: params.address, city: params.city, phone: params.phone, email: params.email, program: params.program
        }, function (err) {
            if (err) return next(err);
        });
        }
      },
      deleteStudent: {
          type: studentType,
          args: {
              id: {
                  type: new GraphQLNonNull(GraphQLString)
              }
          },
          resolve(root, params) {
              const deletedStudent = StudentModel.findByIdAndRemove(params.id).exec();
              if (!deletedStudent) {
                  throw new Error('Error')
              }
              return deletedStudent;
          }
      }
    };
  },
});

//
module.exports = new GraphQLSchema({query: queryType, mutation: mutation});