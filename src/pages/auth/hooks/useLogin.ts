'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '@/hooks/use-auth'

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

const defaultValues: LoginFormValues = {
  email: 'test@example.com',
  password: 'password',
}

export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  })

  const handleSubmit = async (values: LoginFormValues) => {
    await Promise.resolve(login(values.email, values.password))
    navigate('/', { replace: true })
  }

  const onSubmit = form.handleSubmit(handleSubmit)
  const { isSubmitting } = form.formState

  return { form, onSubmit, isSubmitting }
}
