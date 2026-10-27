"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RiLoader3Fill } from "react-icons/ri"
import { postData } from "@/api/fetch-data"
import { getTranslations } from "next-intl/server"


// Initialize translations
const formSchema = (t) => z.object({
  name: z.string().min(2, {
    message: t('validation.name'),
  }),
  email: z.string().email({
    message: t('validation.email'),
  }),
  subject: z.string().min(1, {
    message: t('validation.subject'),
  }),
  message: z.string().min(10, {
    message: t('validation.message'),
  }).max(500, {
    message: "message must be less than 500 characters.",
  })
})



const ContactForm = () => {
  
  const t = useTranslations('contactForm')
const d = useTranslations('placeholders')
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const inputs = [
  {
    name: "name",
    type: "text",
    placeholder: d('name'),
  },
  {
    name: "email",
    type: "email",
    placeholder:d('email'),
  },
  {
    name: "subject",
    type: "text",
    placeholder: d('subject'),
  },
]
  const { formState: { isSubmitting } } = form

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      const res = await postData({url: '/have-questions', data: values})
      if(res.code === 200) {
        toast.success(t('success'))
        form.reset() // Reset form on success
      } else {
        toast.error(t('error'))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(t('error'))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-12 md:col-span-6 bg-light-black  rounded-3xl border border-main xl:p-12 p-6">
        <div className="space-y-4">

          <h3 className="xl:text-4xl text-2xl font-bold text-main">{d('title')}</h3>
          <p className="text-gray-400">{d('description')}</p>
        </div>
        {/* name */}
        {inputs?.map((input, idx) => (
          <FormField
            key={idx}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={input.placeholder} type={input.type} className="placeholder:text-gray-400 text-white h-12 border-1 border-gray-400 focus-visible:ring-main focus-visible:outline-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {/* message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={d('message')}
                  className="resize-none h-24 border-1 border-gray-400 focus-visible:ring-main focus-visible:outline-0 placeholder:text-gray-400 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="px-16 h-12 bg-main hover:bg-main/90 w-1/2 font-semibold">
          {isSubmitting ? <RiLoader3Fill className="animate-spin" /> : d('submitButton')}
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm