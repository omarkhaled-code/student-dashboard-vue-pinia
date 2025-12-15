<script setup>
import Form from './components/Form.vue';
import { ref, computed } from 'vue';

import { useStudentsStore } from './stores/studentsStroe';
const useStudents = useStudentsStore()
const displayAddBox = ref(false)
const currentUserId = ref(null)
const students = computed(() => useStudents.getAllStudents)
const studentsCount = computed(() => useStudents.getAllStudents.length)

const displayEditBox = ref(false)

const openEditBox = (id) => {
  displayEditBox.value = true
  currentUserId.value = id
}
</script>

<template>

  <header>
    <h1 class="text-4xl font-bold">Student List Dashboard</h1>
  </header>

  <main>
    <div class="buttons flex justify-between items-center w-full my-8">
      <div class="actions flex gap-8">
        <!-- <button class="bg-blue-500 hover:bg-transparent hover:text-blue-600 hover:border-blue-600 duration-300"
          @click="() => displayAddBox = true">+
          Add New
          Student</button> -->

        <button class="btn-primary" @click="() => displayAddBox = true">+
          Add New
          Student</button>
        <button class="btn-danger" v-if="studentsCount > 1" @click="useStudents.deleteAllStudent">Delete All
          Students</button>

      </div>
      <h4 class="text-blue-600 text-lg bg-blue-50 py-1 px-4 rounded-lg">Total Students: {{ studentsCount }}</h4>
    </div>
    <div class="table-wrapper rounded-lg border border-gray-200 bg-white " v-if="studentsCount > 0">
      <table class="border-collapse w-full text-left">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Phone Number</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id" class=" border-b border-gray-200 last:border-b-0">
            <td class="text-stone-800  px-6 py-4 text-base">{{ student.name }}</td>
            <td class="text-neutral-500 px-6 py-4">{{ student.email }}</td>
            <td class="text-neutral-500 px-6 py-4">{{ student.phone }}</td>
            <td class="flex gap-4 px-6 py-4">
              <button
                class="edit text-blue-500 text-lg cursor-pointer border-b border-transparent hover:border-blue-500 duration-300"
                @click="openEditBox(student.id)">edit</button>

              <button
                class="delete text-red-500 text-lg cursor-pointer border-b border-transparent hover:border-red-500 duration-300"
                @click="useStudents.deleteStudent(student.id)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p align="center" v-else>No Student To Display!</p>
    <Teleport to="#modal">

      <div class="modal-bg fixed top-0 left-0 w-screen h-screen bg-black/50 d-flex" v-if="displayEditBox">
        <div class="modal">
          <Form type="update" @cancel="displayEditBox = false" :id="currentUserId" />
        </div>
      </div>

    </Teleport>
    <Teleport to="#modal">
      <div class="modal-bg fixed top-0 left-0 w-screen h-screen bg-black/50 d-flex" v-if="displayAddBox">
        <!-- <div class="modal-bg" v-if="displayAddBox"> -->
        <div class="modal">
          <Form type="create" @cancel=" displayAddBox = false" />
        </div>
      </div>

    </Teleport>
  </main>

</template>
