import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [
      {
        id: 1,
        name: "omar khaled",
        email: "o@o.o",
        phone: "0123456789"
      },
      {
        id: 2,
        name: "amar khaled",
        email: "a@a.a",
        phone: "0123456789"
      },
      {
        id: 3,
        name: "mahmoud ahmed",
        email: "m@m.m",
        phone: "0123456789"
      }
    ]
  }),
  getters: {
    getAllStudents(state) {
      return state.students
    },
    getStudent(state) {
      return (id) => state.students.find(s => s.id === id)
    }

  },
  actions: {
    checkStudent(student){
      const found = this.students.find(s => s.name === student.name)
      return found ? found.id : 0
      
    },
    addNewStudent(student) {
      this.students.push(student)
    },
    updateStudent(updatedStudent) {
        const index = this.students.findIndex(s => s.id === updatedStudent.id)
        if (index !== -1) {
            this.students[index] = { ...updatedStudent }
        }
    },
    deleteStudent(id) {
      this.students = this.students.filter((student) =>  student.id !== id)
    },
    deleteAllStudent(){
      this.students = []
    }
    
  },
})