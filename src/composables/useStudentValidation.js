import { ref } from "vue";

export function useStudentValidation(){
    const errors = ref({
        name:"",
        email:"",
        phone:"",
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validate = (student) => {
        let isValid = true;

        errors.value = { name: '', email: '', phone: '' }

        if(!student.name.trim()) {
            errors.value.name = "Name Is Required";
            isValid = false
        }

        if(!emailRegex.test(student.email)) {
            errors.value.email = "Email Is Required";
            isValid = false
        }

        if(!student.phone.trim()) {
            errors.value.phone = "Phone Is Required"
            isValid = false
        }
        return isValid;
    }

    return {errors, validate}
}