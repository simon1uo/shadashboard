'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '@/hooks/use-auth'

export const signupFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type SignupFormValues = z.infer<typeof signupFormSchema>

const defaultValues: SignupFormValues = {
  email: '',
  password: '',
}

export function useSignup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
  })

  const handleSubmit = async (values: SignupFormValues) => {
    await Promise.resolve(login(values.email, values.password))
    navigate('/login', { replace: true })
  }

  const onSubmit = form.handleSubmit(handleSubmit)
  const { isSubmitting } = form.formState

  return { form, onSubmit, isSubmitting }
}
