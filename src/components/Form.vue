<script setup>
import { useStudentsStore } from '../stores/studentsStroe';
import { useStudentValidation } from '../composables/useStudentValidation'
import { onMounted, ref } from 'vue';

const { errors, validate } = useStudentValidation()
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: false,
    }
})

const useStudents = useStudentsStore()

const student = ref({
    id: null,
    name: "",
    email: "",
    phone: "",
})


const emit = defineEmits(['cancel'])

const handleCancel = () => {
    emit('cancel')
}

onMounted(() => {
    if (props.type === 'update' && props.id) {
        const original = useStudents.getStudent(props.id)
        student.value = { ...original } // ✅ CLONE
    }
})


const handleForm = () => {

    if (!validate(student.value)) return;

    const checkValue = useStudents.checkStudent(student.value)

    if (props.type === 'create') {
        if (checkValue === 0) {
            student.value.id = Date.now()
            useStudents.addNewStudent(student.value)
            emit('cancel')
            return;
        }
    } else if (props.type === 'update' && props.id) {

        if (props.id === checkValue || checkValue === 0) {
            student.value.id = props.id;

            useStudents.updateStudent(student.value)
            emit('cancel')
            return;
        }
    }
    if (checkValue !== 0 && checkValue !== props.id) {
        errors.value.name = 'This Name Is Used!'
    }




}


</script>
<template>
    <div
        class="form w-[400px] min-h-[425px] bg-white p-4 flex flex-col rounded-lg gap-4 absolute left-[50%] right-[50%] translate-[-50%] duration-300 z-2">
        <h3 class="text-3xl text-center my-4 font-semibold"> {{ type === 'update' ? 'Edit ' : 'Add New ' }}Student</h3>
        <label class="flex gap-1 flex-col">
            <span
                class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] text-lg font-normal">Name</span>
            <input type="text" :class="{ 'border-red-500': errors.name }" class="input" placeholder="Omar Khaled"
                v-model="student.name" @input="errors.name = ''" />
            <p v-if="errors && errors.name" class="text-sm text-red-500">{{ errors.name }}</p>

        </label>
        <label class="flex gap-1 flex-col">
            <span
                class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] text-lg font-normal">Email</span>
            <input type="email" :class="{ 'border-red-500': errors.email }" class="input" placeholder="omar@example.com"
                v-model="student.email" @input="errors.email = ''" />
            <p v-if="errors && errors.email" class="text-sm text-red-500">{{ errors.email }}</p>

        </label>
        <label class="flex gap-1 flex-col">
            <span
                class="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] text-lg font-normal">Phone</span>
            <input type="text" :class="{ 'border-red-500': errors.phone }" class="input" placeholder="0123456789"
                v-model="student.phone" @input="errors.phone = ''" />
            <p v-if="errors && errors.phone" class="text-sm text-red-500">{{ errors.phone }}</p>

        </label>
        <div class="buttons d-flex gap-8 mt-4 mb-2">
            <button class="cancel-update btn-danger" @click="handleCancel">Cancel</button>
            <button class="btn-primary" @click="handleForm">{{ type === 'update' ? 'Update' : 'Create'
            }}</button>
        </div>
    </div>
</template>
