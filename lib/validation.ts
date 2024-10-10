import {z} from 'zod';

const formSchema = z.object({
    username: z.string().min(2,"Username must be at least 2 characters."),
    email:z.string().email("Invalid email"),
    phone:z.string().refine((val)=>/^\+\d{10, 15}/.test(val), "Invalid phone number" )
  })


export {formSchema};